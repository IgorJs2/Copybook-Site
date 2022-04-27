import { createSlice } from '@reduxjs/toolkit'

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    Counter: null,
    isFetching: false,
  },
  reducers: {
    operationStart: (state) => {
      state.isFetching = true
    },
    setCounter: (state) => {
      state.isFetching = false
    },
    getCounter: (state, action) => {
      state.isFetching = false
      state.Counter = action.payload
    },
    clearStateAtt: (state) => {
      state.Counter = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  operationStart,
  setCounter,
  getCounter,
  clearStateAtt,
} = attendanceSlice.actions
export default attendanceSlice.reducer
