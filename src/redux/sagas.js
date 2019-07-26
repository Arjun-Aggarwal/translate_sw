import { call, put, takeLatest, all } from 'redux-saga/effects'
import { GET_TRANSLATION,TRANSLATION_UNSUCCESSFUL, TRANSLATION_SUCCESSFUL} from './actions.js'
const translateHindi = async(toTranslate) => {
  const encoded = encodeURI(toTranslate)
  const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|hi`
  const data = {
    q: toTranslate,
    langpair: ['en', 'hi'],
    headers: new Headers()
  }
  try {
    let translation = await fetch(url)
    translation = await translation.json()
    return translation["responseData"]["translatedText"]
  }
  catch(e) {
    throw e.message
  }
}

function* fetchTranslation(action) {
  try {
    const translated = yield call(translateHindi, action.payload)
    console.log(translated)
    yield put({type: TRANSLATION_SUCCESSFUL, payload: translated})
  }
  catch(e) {
    yield put({type: TRANSLATION_UNSUCCESSFUL, payload: e})
  }
}

export default function* watchGetTranslation() {
  yield takeLatest(GET_TRANSLATION, fetchTranslation)
}
/*
export default function* rootSaga() {
  yield all[
    watchGetTranslation(),
    fetchTranslation()
  ]
}
*/
