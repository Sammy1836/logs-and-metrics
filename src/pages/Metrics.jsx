import { Typography } from "@mui/material";
import { MimicMetrics } from "../api-mimic";
import Graph from "../components/Graph";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedTime;
};

const Metrics = () => {
    const [data, setData] = useState({});

    const timeDiff = useSelector(state => state.time.timeDiff);
    const endTs = Date.now();
    const startTs = endTs - timeDiff;
    console.log("Time Diff: " + timeDiff);
    console.log("start: " + startTs);
    console.log("end: " + endTs);

    useEffect(() => {
        MimicMetrics.fetchMetrics({ startTs, endTs }).then(metrics => {
            setData(metrics);
            console.log(data);
        })
    }, [timeDiff])


    return (
        <>
            <div className="metricsOuter">
                <div className="metricsHeading">
                    <Typography variant={'h5'}>Metrics </Typography>
                    <Typography variant={'h6'} style={{ color: 'gray', fontSize: '12px', paddingLeft: '10px' }}>{formatDate(startTs) + ' → ' + formatDate(endTs)} </Typography>
                </div>
                <div className="metricsBody">
                    {data ? <Graph data={data} /> : <Typography variant={'h6'} style={{ color: '#5E7BAA', padding: '20px' }}>Loading.</Typography>}
                </div>
            </div>
        </>
    )
}

export default Metrics;
export { formatDate };