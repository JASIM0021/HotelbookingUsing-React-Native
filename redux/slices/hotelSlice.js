import { createSlice } from '@reduxjs/toolkit';
import hotelsData from '../../data/hotels.json';

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: hotelsData,
  reducers: {},
});

export default hotelSlice.reducer;
