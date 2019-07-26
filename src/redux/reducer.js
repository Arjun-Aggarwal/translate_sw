
const defaultState = {
  translated: "",
  error: ""
}
export const reducer = (state={...defaultState}, action) => {
  switch(action.type) {
    case 'TRANSLATION_SUCCESSFUL':
      return {
        ...state,
        translated: action.payload
      }
    case 'TRANSLATION_UNSUCCESSFUL':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
    }
}
