import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    isFetching: false,
    error: null,
    messageFile: null,
  },
  reducers: {
    operationFileStart: (state) => {
      state.isFetching = true
    },
    getDataFile: (state, action) => {
      state.isFetching = false
      state.messageFile = action.payload
      state.error = null
    },
    errorFile: (state, action) => {
      state.error = action.payload
      state.isFetching = false
    },
    createFile: (state, action) => {
      state.isFetching = false
      state.messageFile = action.payload
      state.error = null
    },
    deleteFile: (state, action) => {
      state.isFetching = false
      state.messageFile = null
    },
    clearFileData: (state) => {
      state.isFetching = false
      state.messageFile = null
      state.error = null
    },
    operationFileFailure: (state) => {
      state.isFetching = false
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataFile,
  operationFileStart,
  operationFileFailure,
  errorFile,
  createFile,
  deleteFile,
  clearFileData,
} = fileSlice.actions
export default fileSlice.reducer
