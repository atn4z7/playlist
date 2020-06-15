import {
  configureStore as RTKconfigureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'
import rootReducer from './reducer'
import rootSaga from './sagas'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()

  const defaultMiddleware = getDefaultMiddleware({
    thunk: false,
    // temp solution to make redux-persist work with redux toolkit
    // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })

  const store = RTKconfigureStore({
    reducer: rootReducer,
    middleware: [...defaultMiddleware, loggerMiddleware, sagaMiddleware]
  })

  const persistor = persistStore(store)

  // start sagas
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
