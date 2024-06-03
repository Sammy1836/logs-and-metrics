import { Typography } from "@mui/material";
import Loader from '../assets/Spinner.svg';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const logFormatDate = (timestamp) => {
    const date = new Date(timestamp);

    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    const formattedTime = `${month} ${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    return formattedTime;
};

export const getStatus = (message) => {
    const status = message[0];
    if (status < 'h') {
        return 'error';
    } else if (status < 'p') {
        return 'success';
    } else {
        return 'info';
    }
}

export const getColor = (name) => {
    switch (name) {
        case 'success':
            return '#2DD4BF';
        case 'error':
            return '#F87171';
        default:
            return '#5E7BAA';
    }
};

const LogTable = ({ logs, active }) => {

    return (
        <>
            <div className="logsOuter">
                <div className="loader">
                    {logs.length === 0 ? (
                        <>
                            <img src={Loader} alt="loading" />
                            <Typography variant={'h6'} style={{ color: '#82A0CE', paddingLeft: '10px' }}>Loading logs...</Typography>
                        </>
                    ) :
                        <Typography variant={'h6'} style={{ color: 'green' }}>
                            {active ? 'Fetching live logs...' : 'Logs fetched successfully'}
                        </Typography>}
                </div>
                {logs.length > 0 ? logs.map((log, index) => (
                    <div className="logLine" key={index} >
                        <Typography className={'time'} variant={'h6'} style={{ borderLeft: `5px solid ${getColor(getStatus(log.message))}` }}>
                            {logFormatDate(log.timestamp)}
                        </Typography>
                        <Typography className={'status'} variant={'h6'} color={getColor(getStatus(log.message))}>
                            {'[' + getStatus(log.message) + ']'}
                        </Typography>
                        <Typography className={'message'} variant={'h6'}>
                            {log.message}
                        </Typography>
                    </div>
                )) :
                    <Typography variant={'h6'} style={{ color: '#5E7BAA', padding: '20px' }}>No logs available</Typography>
                }
            </div>
        </>
    )
}

export default LogTable;