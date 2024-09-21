import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './slices/hotelSlice';
import bookingReducer from './slices/bookingSlice';
export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    bookings: bookingReducer,
  },
});
