import { createSlice } from '@reduxjs/toolkit'

const signalsSlice = createSlice({
  name: 'signals',
  initialState: {
    currentSignals: null,
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationSignalsStart: (state) => {
      state.isFetching = true
    },
    getDataSignals: (state, action) => {
      state.isFetching = false
      state.currentSignals = action.payload
    },
    createSignals: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    deleteSignals: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    operationSignalsFailure: (state) => {
      state.isFetching = false
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    clearStateS: (state) => {
      state.currentSignals = null
      state.messages = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataSignals,
  operationSignalsStart,
  operationSignalsFailure,
  createSignals,
  deleteSignals,
  deleteMessages,
  clearStateS,
} = signalsSlice.actions
export default signalsSlice.reducer
