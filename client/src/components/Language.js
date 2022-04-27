import { useDispatch } from 'react-redux'
import { getLanguageData } from '../redux/apiLanguage'
import { changeLanguageHandler } from '../handlers/changeLanguageHandler'

const Language = () => {
  const dispatch = useDispatch()

  return (
    <div className="lang">
      <div className="form">
        <div
          data-lang="EN"
          onClick={(e) => {
            changeLanguageHandler(getLanguageData, dispatch, e)
          }}
        >
          EN
        </div>
        <div
          data-lang="UA"
          onClick={(e) => {
            changeLanguageHandler(getLanguageData, dispatch, e)
          }}
        >
          UA
        </div>
      </div>
    </div>
  )
}

export default Language
