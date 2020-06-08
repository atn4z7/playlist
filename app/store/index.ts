import {
  configureStore as RTKconfigureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import loggerMiddleware from 'redux-logger'
import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['playlists', 'songs']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
  const defaultMiddleware = getDefaultMiddleware({
    thunk: false,
    // temp solution to make redux-persist work with redux toolkit
    // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })

  const store = RTKconfigureStore({
    reducer: persistedReducer,
    middleware: [...defaultMiddleware, loggerMiddleware]
  })

  const persistor = persistStore(store)

  return { store, persistor }
}
