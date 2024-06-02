import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, elements } from 'chart.js';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTimeDiff } from '../redux/timeSlice';
import LogTable from './LogTable';
import { MimicLogs } from '../api-mimic';
import LogPopup from './LogPopup';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const Graph = ({ data }) => {

    const [logs, setLogs] = useState([]);

    const [selectedXrange, setSelectedXrange] = useState({});
    const [isSelected, setisSelected] = useState(false);
    const [startSelection, setStartSelection] = useState(false);
    const [clickXpositon, setClickXposition] = useState({});
    const [showLogPopup, setShowLogPopup] = useState(false);

    const style = {
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '100',
        width: '95vw',
        margin: '0',
    }

    useEffect(() => {
        if (isSelected) {
            const { start, end } = selectedXrange;

            if (start && end) {
                const [startH, startM] = start.split(':');
                const [endH, endM] = end.split(':');

                const startTime = new Date();
                startTime.setHours(startH, startM, 0, 0);
                const endTime = new Date();
                endTime.setHours(endH, endM, 0, 0);
                const startTs = startTime.getTime();
                const endTs = endTime.getTime();

                // const startTs = (startH * 60 + startM) * 60 * 1000;
                // const endTs = (endH * 60 + endM) * 60 * 1000;
                const limit = 10 + Math.floor(Math.random() * 90);

                MimicLogs.fetchPreviousLogs({ startTs, endTs, limit })
                    .then(logs => {
                        setLogs(logs);
                        console.log(logs);
                    })
            }
        }
    }, [isSelected, selectedXrange])

    const handleMouseDown = (chart, elements) => {
        if (elements.length > 0) {
            const xAxis = chart.scales.x;
            const xValue = xAxis.getLabelForValue(elements[0].index);
            console.log('Mousedown x-axis value:', xValue);
            setSelectedXrange({ start: xValue, end: null });
            setStartSelection(true);
        }
        else {
            window.alert(`Please select a valid range. Press and hold the mouse when a tooltip is visible on the chart`);
        }
    }

    const handleMouseUp = (chart, elements, event) => {
        if (elements.length > 0) {
            console.log(elements);
            setClickXposition({ x: event.clientX, y: event.clientY });
            const xAxis = chart.scales.x;
            const xValue = xAxis.getLabelForValue(elements[0].index);
            console.log('Mouseup x-axis value:', xValue);
            setSelectedXrange(range => ({ ...range, end: xValue }));
            setisSelected(true);
            setStartSelection(false);
        }
        else {
            window.alert(`Please select a valid range. Release the mouse when a tooltip is visible on the chart`);
        }
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        return <Typography variant={'h6'} style={{ color: '#5E7BAA', padding: '20px' }}>Loading...</Typography>;
    }

    const getColor = (name) => {
        switch (name) {
            case 'Limits':
                return '#059669';
            case 'Requested':
                return '#2563EB';
            case 'Used':
                return '#DC2626';
            case 'Read':
                return '#2563EB';
            case 'Write':
                return '#DC2626';
            default:
                return 'Black';
        }
    };

    const generateChartData = (metric) => ({
        labels: metric.graphLines[0].values.map(point => new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: metric.graphLines.map(line => ({
            label: line.name,
            data: line.values.map(point => point.value),
            borderColor: getColor(line.name),
            backgroundColor: metric.name === 'Disk IOPS' ? getColor(line.name) : 'transparent',
            tension: 0.1,
            fill: metric.name === 'Disk IOPS' ? true : false,
            borderWidth: 2,
        })),
    });

    const generateOptions = (metric) => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'start'
            },
            title: {
                display: true,
                text: metric.name,
            },
            beforeEvent(chart, args, pluginOptions) {
                const event = args.event;
                if (event.type === 'mouseout') {
                    setisSelected(false);
                    setStartSelection(false);
                    setSelectedXrange({});
                    console.log('mouse out');
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        pointStyle: false,
        events: ['mousedown', 'mousemove', 'mouseup', 'mouseout'],
        onHover: (event, elements, chart) => {
            if (startSelection && event.type === 'mouseup') {
                handleMouseUp(chart, elements, event.native);
            }
            else if (!isSelected && event.type === 'mousedown') {
                handleMouseDown(chart, elements);
            }
        },
    });


    return (
        <>
            <div className="graphOuter">
                {data.map((metric, index) => (
                    <div key={index} className="graphInner">
                        <Line data={generateChartData(metric)} options={generateOptions(metric)} />
                    </div>
                ))}
            </div>

            {isSelected &&
                <>
                    <ButtonGroup orientation="vertical" style={{
                        position: 'fixed',
                        left: `${clickXpositon.x}px`,
                        top: `${clickXpositon.y + 50}px`,
                        zIndex: 1000,
                        alignItems: 'center'
                    }}>
                        <Button variant='contained' color="success"
                            onClick={() => {
                                console.log(selectedXrange, clickXpositon);
                                setShowLogPopup(true);
                                setisSelected(false);
                            }}>
                            Get Data
                        </Button>
                        <Button variant='contained' style={{ width: '5px', borderRadius: '50%' }} color="error" onClick={() => { setisSelected(false); }}>
                            X
                        </Button>
                    </ButtonGroup>
                </>}

            {showLogPopup &&
                <>
                    <Button variant='contained' style={{ ...style, top: '55px', width: 'auto' }} color="error"
                        onClick={() => { setShowLogPopup(false); }} >
                        X
                    </Button>
                    <div className="logsOuter" style={style}>
                        <LogPopup logs={logs} />
                    </div>
                </>
            }
        </>
    );
};

export default Graph;
