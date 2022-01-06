import { createSlice } from "@reduxjs/toolkit";
import { FaqItem } from "services/faq";

const initialState: {
  data: FaqItem[];
  isLoading: boolean;
} = {
  data: [],
  isLoading: false,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    getAllFaq: (state, action) => {
      state.isLoading = true;
    },
    getAllFaqSuccess: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    },
    getAllFaqFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { getAllFaq, getAllFaqSuccess, getAllFaqFailed } =
  faqSlice.actions;

export default faqSlice.reducer;
