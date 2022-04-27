import { useCallback } from 'react'
import { languageHandler } from '../handlers/languageHandler'

export const useMessage = () => {
  return useCallback((text, flag, lang) => {
    if (window.M && text) {
      if (languageHandler(lang, text)) {
        document.documentElement.style.setProperty('--toast-color-code', flag)
        window.M.toast({ html: languageHandler(lang, text) })
      }
    }
  }, [])
}
