import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NormalizedObjects, PlayList } from 'types'

type PlayListsState = NormalizedObjects<PlayList>

type AddSongsPayload = {
  playlistId: string
  songIds: Array<string>
}

const initialState: PlayListsState = {
  byId: {
    '1': {
      id: '1',
      name: 'Work',
      songIds: [],
      icon: 'work',
      colors: ['#FFD200', '#9C5700']
    },
    '2': {
      id: '2',
      name: 'Roadtrip',
      songIds: [],
      icon: 'directions-car',
      colors: ['#34E89E', '#0F3443']
    },
    '3': {
      id: '3',
      name: 'Relaxation',
      songIds: [],
      icon: 'local-cafe',
      colors: ['#006BC9', '#00084D']
    },
    '4': {
      id: '4',
      name: 'Biking',
      songIds: [],
      icon: 'local-cafe',
      colors: ['#FE8C00', '#F83600']
    }
  },
  allIds: ['1', '2', '3', '4']
}

const slice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    addSongs(state, action: PayloadAction<AddSongsPayload>) {
      const { playlistId, songIds } = action.payload
      state.byId[playlistId].songIds.push(...songIds)
    }
  }
})

const actions = slice.actions
const reducer = slice.reducer

export { actions, reducer }
