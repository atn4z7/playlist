import { combineReducers } from 'redux'
import playlists from './features/playlists'
import songs from './features/songs'

const rootReducer = combineReducers({
  playlists: playlists.reducer,
  songs: songs.reducer
})

export default rootReducer
