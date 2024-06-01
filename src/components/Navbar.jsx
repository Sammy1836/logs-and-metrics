import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../assets/TF logo.svg"
import activeMetrics from "../assets/metrics.png";
import metrics from "../assets/metrics-gray.png";
import activeLogs from "../assets/list-active.png";
import logs from "../assets/list.png";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
    return (
        <>
            <div className="navBar">
                <div className="headingText">

                    <img className={'logo'} src={logo} alt="logo" />
                </div>

                <div className={'tabs'}>
                    <NavLink
                        to="/metrics"
                        className={({ isActive }) => (isActive ? 'activeTab' : 'tab')}
                    >
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? activeMetrics : metrics} alt="Metrics Icon" />
                                <Typography variant={'h6'}>Metrics</Typography>
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to="/logs"
                        className={({ isActive }) => (isActive ? 'activeTab' : 'tab')}
                    >
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? activeLogs : logs} alt="Logs Icon" />
                                <Typography variant={'h6'}>Logs</Typography>
                            </>
                        )}
                    </NavLink>

                </div>

                <div className="dropdownMenu">
                    <DropdownMenu />
                </div>
            </div >
        </>
    )
}

export default Navbar;