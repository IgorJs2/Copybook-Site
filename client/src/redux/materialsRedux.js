import { createSlice } from '@reduxjs/toolkit'

const MaterialsSlice = createSlice({
  name: 'materials',
  initialState: {
    currentMaterials: null,
    isFetching: false,
    messages: null,
  },
  reducers: {
    operationMaterialsStart: (state) => {
      state.isFetching = true
    },
    getDataMaterials: (state, action) => {
      state.isFetching = false
      state.currentMaterials = action.payload
    },
    createMaterials: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    deleteMaterials: (state, action) => {
      state.isFetching = false
      state.messages = action.payload
    },
    operationMaterialsFailure: (state) => {
      state.isFetching = false
    },
    deleteMessages: (state) => {
      state.messages = null
    },
    clearStateM: (state) => {
      state.currentMaterials = null
      state.messages = null
    },
    default: (state) => {
      state.isFetching = false
      return state
    },
  },
})

export const {
  getDataMaterials,
  operationMaterialsStart,
  operationMaterialsFailure,
  createMaterials,
  deleteMaterials,
  deleteMessages,
  clearStateM,
} = MaterialsSlice.actions
export default MaterialsSlice.reducer
