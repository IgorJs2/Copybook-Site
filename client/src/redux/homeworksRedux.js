import { createSlice } from '@reduxjs/toolkit'

const HomeworksSlice = createSlice({
  name: 'homeworks',
  initialState: {
    currentHomeworks: [],
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationHomeworksStart: (state) => {
      state.isFetching = true
    },
    getDataHomeworks: (state, action) => {
      state.isFetching = false
      state.currentHomeworks = action.payload
    },
    createHomeworks: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    deleteHomeworks: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    operationHomeworksFailure: (state) => {
      state.isFetching = false
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    clearStateH: (state) => {
      state.currentHomeworks = []
      state.messages = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataHomeworks,
  operationHomeworksStart,
  operationHomeworksFailure,
  createHomeworks,
  deleteHomeworks,
  deleteMessages,
  clearStateH,
} = HomeworksSlice.actions
export default HomeworksSlice.reducer
