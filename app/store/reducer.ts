import { combineReducers } from 'redux'
import { reducer as playlists } from './features/playlists'
import { reducer as songs } from './features/songs'
import { reducer as current } from './features/current'

const rootReducer = combineReducers({
  playlists,
  songs,
  current
})

export default rootReducer
