import { combineReducers } from 'redux'
import playlists from './playlists'
import songs from './songs'

const rootReducer = combineReducers({
  playlists: playlists.reducer,
  songs: songs.reducer
})

export default rootReducer
