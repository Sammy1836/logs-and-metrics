import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeDiff: 60 * 60 * 1000,
    active: false
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
        }
    }
});

export const { updateTime, updateActive } = timeSlice.actions;
export default timeSlice.reducer;