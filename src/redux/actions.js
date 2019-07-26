export const GET_TRANSLATION = 'GET_TRANSLATION'
export const TRANSLATION_SUCCESSFUL = 'TRANSLATION_SUCCESSFUL'
export const TRANSLATION_UNSUCCESSFUL = 'TRANSLATION_UNSUCCESSFUL'

export const getTranslation = translation => ({
  type: GET_TRANSLATION,
  payload: translation
})
