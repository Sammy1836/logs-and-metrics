import { useDispatch } from "react-redux";
import { updateActive, updateTime } from "../redux/timeSlice";

const DropdownMenu = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        dispatch(updateTime(value));
        dispatch(updateActive(value !== ''));
        console.log(value);
        console.log(updateActive(value !== ''));
    };

    return (
        <>
            <select onChange={handleChange}
            >
                <option value={''}>Select Time Frame</option>
                <option value={5 * 60 * 1000}>Last 5 minutes</option>
                <option value={15 * 60 * 1000}>Last 15 minutes</option>
                <option value={30 * 60 * 1000}>Last 30 minutes</option>
                <option value={60 * 60 * 1000}>Last 1 hour</option>
                <option value={3 * 60 * 60 * 1000}>Last 3 hours</option>
                <option value={6 * 60 * 60 * 1000}>Last 6 hours</option>
            </select>
        </>
    )
}

export default DropdownMenu;