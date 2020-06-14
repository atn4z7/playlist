import { createSlice } from '@reduxjs/toolkit'
import { NormalizedObjects, Song } from 'types'

const songs = require('../../../assets/data/songs.json')

export type SongsState = NormalizedObjects<Song>

const initialState: SongsState = {
  byId: songs,
  allIds: Object.keys(songs)
}

const slice = createSlice({
  name: 'songs',
  initialState,
  reducers: {}
})

const actions = slice.actions
const reducer = slice.reducer

export { actions, reducer }
