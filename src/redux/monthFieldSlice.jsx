import {createSlice} from '@reduxjs/toolkit';

export const monthTitleSlice = createSlice({
  name: 'monthTitle',
  initialState: {
    value: '',
  },
  reducers: {
    setMonthTitle: (state, action) => {
      Object.assign(state, {value: action.payload});
    },
  },
});

// Action creators are generated for each case reducer function
export const {setMonthTitle} = monthTitleSlice.actions;

export default monthTitleSlice.reducer;