export const changeLanguageHandler = async (getLanguageData, dispatch, e) => {
  const element = e.target.getAttribute('data-lang')
  await getLanguageData(dispatch, element, 'CHANGE_LANGUAGE')
}
