import { createSlice } from "@reduxjs/toolkit";

import { SnackbarKey } from "notistack";
import { SNACKBAR_VARIANTS } from "shared/comom.enum";
import { guid } from "utilities";

export type SnackbarItem = {
  message: string;
  options: {
    variant: SNACKBAR_VARIANTS;
    key: SnackbarKey;
  };
};

const initialState: {
  data: Array<SnackbarItem>;
} = {
  data: [],
};

const SnackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    enqueueSnackbar: (state, action) => {
      const { message, variant } = action.payload;
      const key = guid();
      state.data.push({ message, options: { variant, key } });
    },
    removeSnackbar: (state, action) => {
      const idRemoved = action.payload;
      state.data = state.data.filter((item) => item.options.key !== idRemoved);
    },
  },
});

export const { enqueueSnackbar, removeSnackbar } = SnackBarSlice.actions;

export default SnackBarSlice.reducer;
