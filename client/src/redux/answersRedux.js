import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
  name: "answers",
  initialState: {
    currentAnswers: null,
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationAnswersStart: (state) => {
      state.isFetching = true;
    },
    getDataAnswers: (state, action) => {
      state.isFetching = false;
      state.currentAnswers = action.payload;
    },
    createAnswers: (state, action) => {
      state.isFetching = false;
      state.messages = action.payload;
    },
    deleteAnswers: (state, action) => {
      state.isFetching = false;
      state.messages = action.payload;
    },
    operationAnswersFailure: (state) => {
      state.isFetching = false;
    },
    deleteMessages: (state) => {
      state.messages = null;
    },
    clearStateA: (state) => {
      state.currentAnswers = null;
    },
    default: (state) => {
      state.isFetching = false;
      return state;
    },
  },
});

export const {
  getDataAnswers,
  operationAnswersStart,
  operationAnswersFailure,
  createAnswers,
  deleteAnswers,
  deleteMessages,
  clearStateA,
} = answersSlice.actions;
export default answersSlice.reducer;
