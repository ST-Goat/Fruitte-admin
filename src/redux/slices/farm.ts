import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabControllers: {
    selected: 0,
  },
};

const FarmSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeTabWithId: (state, action) => {
      state.tabControllers.selected = action.payload;
    },
  },
});

export const { changeTabWithId } = FarmSlice.actions;

export default FarmSlice.reducer;
