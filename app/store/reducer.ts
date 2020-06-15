import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { reducer as playlists } from './features/playlists'
import { reducer as songs } from './features/songs'
import { reducer as current } from './features/current'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['current']
}

const currentPersistConfig = {
  key: 'current',
  storage: AsyncStorage,
  blacklist: ['isPlaying', 'positionMillis']
}

const rootReducer = combineReducers({
  playlists,
  songs,
  current: persistReducer(currentPersistConfig, current)
})

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer)

export default persistedRootReducer
