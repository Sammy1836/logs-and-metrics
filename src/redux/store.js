import { configureStore } from '@reduxjs/toolkit';
import timeReducer from './timeSlice';

export const store = configureStore({
    reducer: {
        time: timeReducer
    }
})
