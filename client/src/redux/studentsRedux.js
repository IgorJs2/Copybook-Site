import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    currentStudent: null,
    currentStudentChart: null,
    currentStudentAllChart: null,
    studentList: null,
    choosenStudent: [],
    isFetching: false,
  },
  reducers: {
    getDataStudent: (state, action) => {
      state.currentStudent = action.payload
    },
    getDataChartStudent: (state, action) => {
      state.currentStudentChart = action.payload
    },
    getDataChartAllStudent: (state, action) => {
      state.currentStudentAllChart = action.payload
    },
    getDataList: (state, action) => {
      state.studentList = action.payload
    },
    setChoosenStudent: (state, action) => {
      state.choosenStudent = action.payload
    },
    clearStateST: (state) => {
      state.currentStudent = null
      state.currentStudentChart = null
      state.currentStudentAllChart = null
      state.choosenStudent = null
      state.studentList = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataStudent,
  setChoosenStudent,
  clearStateST,
  getDataList,
  getDataChartStudent,
  getDataChartAllStudent,
} = studentSlice.actions
export default studentSlice.reducer
