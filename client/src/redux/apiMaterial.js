import {
  getDataMaterials,
  operationMaterialsStart,
  operationMaterialsFailure,
  createMaterials,
  deleteMessages,
} from './materialsRedux'

export const getMaterialsData = async (dispatch, data, action) => {
  if (action === 'GET_MATERIALS') {
    dispatch(operationMaterialsStart())
    try {
      const body = JSON.stringify({ id: data })
      const response = await fetch('/api/class/get_materials', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataMaterials = await response.json()
      dispatch(getDataMaterials(dataMaterials))
    } catch (err) {
      dispatch(operationMaterialsFailure())
    }
  }
  if (action === 'CREATE_MATERIALS') {
    dispatch(operationMaterialsStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/create_material', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataMaterials = await response.json()
      dispatch(createMaterials(dataMaterials))
    } catch (err) {
      dispatch(operationMaterialsFailure())
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
