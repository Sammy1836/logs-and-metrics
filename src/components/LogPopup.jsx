import { Typography } from "@mui/material";
import { getColor, getStatus, logFormatDate } from "./LogTable";

const LogPopup = ({ logs, style }) => {
    return (
        <>
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
        </>
    )
}

export default LogPopup;