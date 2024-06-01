import { useEffect, useState } from "react";
import { MimicLogs } from "../api-mimic";
import { Typography } from "@mui/material";
import LogTable from "../components/LogTable";
import { formatDate } from "./Metrics";
import { useSelector } from "react-redux";

let arr = [];

const Logs = () => {
    const [logs, setLogs] = useState([]);

    const timeDiff = useSelector(state => state.time.timeDiff);
    const active = useSelector(state => state.time.active);

    const endTs = Date.now();
    const startTs = endTs - timeDiff;
    const limit = 10 + Math.floor(Math.random() * 90);

    useEffect(() => {
        MimicLogs.fetchPreviousLogs({ startTs, endTs, limit })
            .then(logs => {
                setLogs(logs);
                console.log(logs);
            })
    }, [timeDiff])

    useEffect(() => {
        let unsubscribe;

        if (active) {
            MimicLogs.subscribeToLiveLogs((log) => {
                console.log(log);
                arr.push(log);
                setLogs(arr);
                console.log('arr', arr);
                console.log(logs);
            })
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [active]);

    // useEffect(() => {
    //     setLogs(arr);
    //     console.log('here');
    // }, [arr])

    return (
        <>
            <Typography variant={'h6'} style={{ fontSize: '12px', textAlign: 'right', padding: ' 10px 25px 5px 20px', color: 'gray' }}>
                {'Showing Logs for ' + formatDate(startTs) + ' → ' + formatDate(endTs)}
            </Typography>
            <LogTable logs={logs} />
        </>
    )
}

export default Logs;