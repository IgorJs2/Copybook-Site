import { createSlice } from '@reduxjs/toolkit'

const GradesSlice = createSlice({
  name: 'grades',
  initialState: {
    currentGrades: [],
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationGradesStart: (state) => {
      state.isFetching = true
    },
    getDataGrades: (state, action) => {
      state.isFetching = false
      state.currentGrades = action.payload
    },
    createGrades: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    deleteGrades: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    operationGradesFailure: (state) => {
      state.isFetching = false
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    homeworkGrades: (state, action) => {
      state.messages = action.payload
    },
    clearStateG: (state) => {
      state.currentGrades = []
      state.messages = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataGrades,
  operationGradesStart,
  operationGradesFailure,
  createGrades,
  deleteGrades,
  deleteMessages,
  clearStateG,
  homeworkGrades,
} = GradesSlice.actions

export default GradesSlice.reducer
