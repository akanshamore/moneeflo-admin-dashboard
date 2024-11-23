import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 4);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { nextStep, prevStep, setStep } = stepSlice.actions;
export default stepSlice.reducer;
