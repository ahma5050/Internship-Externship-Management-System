import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  signUpError: null,
  signInError: null,
  updateError: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.signUpError = null;
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.signUpError = null;
      state.loading = false;
    },
    signupFail: (state, action) => {
      state.signUpError = action.payload;
      state.loading = false;
    },
    signinStart: (state) => {
      state.signInError = null;
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.signInError = null;
      state.loading = false;
    },
    signinFail: (state, action) => {
      state.signInError = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.updateError = null;
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.updateError = null;
      state.loading = false;
    },
    updateFail: (state, action) => {
      state.updateError = action.payload;
      state.loading = false;
    },
    clearErrors: (state) => {
      state.signUpError = null;
      state.signInError = null;
      state.updateError = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.signUpError = null;
      state.signInError = null;
      state.updateError = null;
      state.loading = false;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFail,
  signinStart,
  signinSuccess,
  signinFail,
  updateStart,
  updateSuccess,
  updateFail,
  clearErrors,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;