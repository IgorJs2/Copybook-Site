import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    currentNews: null,
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationNewsStart: (state) => {
      state.isFetching = true
    },
    getDataNews: (state, action) => {
      state.isFetching = false
      state.currentNews = action.payload
    },
    createNews: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    deleteNews: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    operationNewsFailure: (state) => {
      state.isFetching = false
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    clearStateN: (state) => {
      state.currentNews = null
      state.messages = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataNews,
  operationNewsStart,
  operationNewsFailure,
  createNews,
  deleteNews,
  deleteMessages,
  clearStateN,
} = newsSlice.actions
export default newsSlice.reducer
