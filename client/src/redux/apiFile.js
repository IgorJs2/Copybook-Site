import {
  operationFileStart,
  operationFileFailure,
  errorFile,
  createFile,
  deleteFile,
  clearFileData,
} from './fileRedux'
import axios from 'axios'

export const getFileData = async (dispatch, data, action) => {
  console.log(data)
  if (action === 'CREATE_FILE') {
    dispatch(operationFileStart())
    try {
      const body = new FormData()
      body.append('file', data.file)
      await axios
        .post('/api/file/upload', body, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          dispatch(createFile(res.data))
        })
        .catch((error) => {
          if (error.response) {
            dispatch(errorFile(error.response.data))
          }
        })
    } catch (err) {
      dispatch(operationFileFailure())
    }
  }
  if (action === 'DELETE_FILE') {
    dispatch(operationFileStart())
    try {
      const body = data

      await axios
        .delete(`/api/file/delete/${body}`, body, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          dispatch(deleteFile())
        })
    } catch (err) {
      dispatch(operationFileFailure())
    }
  }
  if (action === 'CLEAR_DATA') {
    dispatch(operationFileStart())
    try {
      dispatch(clearFileData())
    } catch (err) {
      dispatch(operationFileFailure())
    }
  }
  if (action === 'CLEAR_OTHER_FILE') {
    dispatch(operationFileStart())
    try {
      await axios.delete(
        `/api/file/clear`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (err) {
      dispatch(operationFileFailure())
    }
  }
  if (action === 'DOWNLOAD_FILE') {
    dispatch(operationFileStart())
    try {
      await axios.get(
        `/api/file/download/${data.name}`,
        { number: 0 },
        {
          headers: { 'content-type': 'multipart/form-data' },
        },
      )
    } catch (err) {
      dispatch(operationFileFailure())
    }
  }
}
