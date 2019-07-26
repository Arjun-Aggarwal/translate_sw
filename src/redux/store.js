import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import watchGetTranslation from './sagas'
import { reducer } from './reducer'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchGetTranslation)
