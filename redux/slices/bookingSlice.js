import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: [],
  reducers: {
    addBooking: (state, action) => {
      state.push(action.payload);
    },
    cancelBooking: (state, action) => {
      return state.filter(booking => booking.id !== action.payload.id);
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
