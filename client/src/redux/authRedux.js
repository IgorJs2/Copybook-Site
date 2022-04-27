import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    messages: null,
    token: null,
    userId: null,
    isAuth: null,
  },
  reducers: {
    login: (state, action) => {
      state.messages = action.payload
      if (action.payload && action.payload.token) {
        state.token = action.payload.token
        state.userId = action.payload.userId
        state.isAuth = true
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: action.payload.userId,
            token: action.payload.token,
          }),
        )
      }
    },
    logout: (state) => {
      state.token = null
      state.userId = null
      state.isAuth = false
      localStorage.removeItem('userData')
      localStorage.removeItem('languageData')
    },
    register: (state, action) => {
      state.messages = action.payload
    },
    forgot: (state, action) => {
      state.messages = action.payload
    },
    change_password: (state, action) => {
      state.messages = action.payload
    },
    auth: (state, action) => {
      state.token = action.payload.data.token
      state.userId = action.payload.data.userId
      state.isAuth = true
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: action.payload.data.userId,
          token: action.payload.data.token,
        }),
      )
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    default: (state) => {
      return state
    },
  },
})

export const {
  login,
  logout,
  auth,
  register,
  forgot,
  change_password,
  deleteMessages,
} = authSlice.actions
export default authSlice.reducer
