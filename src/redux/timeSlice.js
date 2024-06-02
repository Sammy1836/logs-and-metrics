import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeDiff: 60 * 60 * 1000,
    active: false,
    startTime: '',
    endTime: ''
}

export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        updateTime: (state, action) => {
            { action.payload === '' ? state.timeDiff = 60 * 60 * 1000 : state.timeDiff = action.payload }
        },
        updateActive: (state, action) => {
            { state.active = action.payload }
        },
        getTimeDiff: (state, action) => {
            const { start, end } = action.payload;

            if (start && end) {
                const [startH, startM] = start.split(':');
                const [endH, endM] = end.split(':');

                state.startTime = (startH * 60 + startM) * 60 * 1000;
                state.endTime = (endH * 60 + endM) * 60 * 1000;
            }
        }
    }
});

export const { updateTime, updateActive, getTimeDiff } = timeSlice.actions;
export default timeSlice.reducer;