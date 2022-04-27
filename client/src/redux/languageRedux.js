import { createSlice } from '@reduxjs/toolkit'

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLang: 'EN',
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.currentLang = action.payload
      localStorage.setItem(
        'languageData',
        JSON.stringify({
          language: action.payload,
        }),
      )
    },
    getLanguage: (state) => {
      if (localStorage.getItem('languageData')) {
        state.currentLang = JSON.parse(
          localStorage.getItem('languageData'),
        ).language
      } else {
        state.currentLang = 'EN'
      }
    },
    default: (state) => {
      state.currentLang = 'EN'
      return state
    },
  },
})

export const { changeLanguage, getLanguage } = languageSlice.actions
export default languageSlice.reducer
