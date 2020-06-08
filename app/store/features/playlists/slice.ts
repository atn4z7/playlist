import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NormalizedObjects } from '../types'

type PlayList = {
  id: string
  name: string
  songIds: Array<string>
}

type PlayListsState = NormalizedObjects<PlayList>

type AddSongsPayload = {
  playlistId: string
  songIds: Array<string>
}

const initialState: PlayListsState = {
  byId: {
    '1': { id: '1', name: 'Work', songIds: [] },
    '2': { id: '2', name: 'Roadtrip', songIds: [] },
    '3': { id: '3', name: 'Relaxation', songIds: [] },
    '4': { id: '4', name: 'Gym', songIds: [] }
  },
  allIds: ['1', '2', '3', '4']
}

export default createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    addSongs(state, action: PayloadAction<AddSongsPayload>) {
      const { playlistId, songIds } = action.payload
      state.byId[playlistId].songIds.push(...songIds)
    }
  }
})
