import UA from '../language/UA/UA.json'
import EN from '../language/EN/EN.json'

export const languageHandler = (currentLang, field) => {
  if (currentLang === 'EN') {
    return EN[field]
  }
  if (currentLang === 'UA') {
    return UA[field]
  } else {
    return ''
  }
}
