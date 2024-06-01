import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography } from '@mui/material';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Graph = ({ data }) => {
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
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        pointStyle: false,
    })

    return (
        <>
            <div className="graphOuter">
                {data.map((metric, index) => (
                    <div key={index} className="graphInner">
                        <Line data={generateChartData(metric)} options={generateOptions(metric)} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Graph;