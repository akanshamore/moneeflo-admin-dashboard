import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  basicDetails: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  file: File | null;
  multiFiles: File[];
  geolocation: {
    latitude: number;
    longitude: number;
  } | null;
  isSubmitting: boolean;
  submitStatus: "idle" | "loading" | "success" | "error";
}

const initialState: FormState = {
  basicDetails: {
    name: "",
    email: "",
    phone: "",
  },
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  },
  file: null,
  multiFiles: [],
  geolocation: null,
  isSubmitting: false,
  submitStatus: "idle",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setBasicDetails: (
      state,
      action: PayloadAction<FormState["basicDetails"]>
    ) => {
      state.basicDetails = action.payload;
    },
    setAddress: (state, action: PayloadAction<FormState["address"]>) => {
      state.address = action.payload;
    },
    setFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
    },
    setMultiFiles: (state, action: PayloadAction<File[]>) => {
      state.multiFiles = action.payload;
    },
    setGeolocation: (
      state,
      action: PayloadAction<FormState["geolocation"]>
    ) => {
      state.geolocation = action.payload;
    },

    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSubmitStatus: (
      state,
      action: PayloadAction<FormState["submitStatus"]>
    ) => {
      state.submitStatus = action.payload;
    },
    resetForm: () => {
      return initialState;
    },
  },
});

export const {
  setBasicDetails,
  setAddress,
  setFile,
  setMultiFiles,
  setGeolocation,
  setSubmitting,
  setSubmitStatus,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
