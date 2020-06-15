import { configureStore as RTKconfigureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import loggerMiddleware from 'redux-logger'
import rootReducer from './reducer'
import rootSaga from './sagas'

const getMiddleWare = (sagaMiddleware: SagaMiddleware<object>) => {
  if (__DEV__) {
    return [loggerMiddleware, sagaMiddleware]
  } else {
    return [sagaMiddleware]
  }
}

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = getMiddleWare(sagaMiddleware)

  const store = RTKconfigureStore({
    reducer: rootReducer,
    middleware
  })

  const persistor = persistStore(store)

  // start sagas
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
