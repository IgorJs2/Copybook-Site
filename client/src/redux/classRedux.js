import { createSlice } from '@reduxjs/toolkit'

const classSlice = createSlice({
  name: 'class',
  initialState: {
    ClassData: null,
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationStart: (state) => {
      state.isFetching = true
    },
    createClass: (state, action) => {
      state.isFetching = true
      state.messages = action.payload
    },
    deleteClass: (state, action) => {
      state.isFetching = true
      state.messages = action.payload
    },
    connectClass: (state, action) => {
      state.isFetching = true
      state.messages = action.payload
    },
    disconnectClass: (state, action) => {
      state.isFetching = true
      state.messages = action.payload
    },
    NotsuccesfullOperation: (state) => {
      state.isFetching = false
    },
    getClass: (state, action) => {
      state.ClassData = action.payload
      state.messages = null
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    clearStateC: (state) => {
      state.ClassData = null
      state.messages = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  operationStart,
  createClass,
  deleteClass,
  connectClass,
  disconnectClass,
  getClass,
  NotsuccesfullOperation,
  deleteMessages,
  clearStateC,
} = classSlice.actions
export default classSlice.reducer
