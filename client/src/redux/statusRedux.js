import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    student: null,
    objects: [],
  },
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload
    },
    setObjects: (state, action) => {
      state.objects = action.payload
    },
    clearStateST: (state) => {
      state.student = null
      state.objects = []
    },
    default: (state) => {
      return state
    },
  },
})

export const { setStudent, setObjects, clearStateST } = statusSlice.actions
export default statusSlice.reducer
