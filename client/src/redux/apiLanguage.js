import { changeLanguage, getLanguage } from './languageRedux'

export const getLanguageData = async (dispatch, data, action) => {
  if (action === 'CHANGE_LANGUAGE') {
    dispatch(changeLanguage(data))
  }
  if (action === 'GET_LANGUAGE') {
    dispatch(getLanguage())
  }
}
