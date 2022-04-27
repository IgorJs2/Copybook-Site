import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
  },
  reducers: {
    getDataUser: (state) => {
      state.isFetching = true;
    },
    getDataUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    getDataUserFailure: (state) => {
      state.isFetching = false;
    },
    updateUser: (state) => {
      state.isFetching = true;
    },
    clearStateU: (state) => {
      state.currentUser = null;
    },
    default: (state) => {
      state.isFetching = false;
      return state;
    },
  },
});

export const {
  getDataUser,
  getDataUserSuccess,
  getDataUserFailure,
  clearStateU,
  updateUser,
} = userSlice.actions;
export default userSlice.reducer;
