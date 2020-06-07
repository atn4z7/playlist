import { createSlice } from '@reduxjs/toolkit'

type PlayList = {
  id: string
  name: string
  songIds: Array<string>
}

type PlayListsState = Array<PlayList>

const initialState: PlayListsState = [
  { id: '1', name: 'Work', songIds: [] },
  { id: '2', name: 'Roadtrip', songIds: [] },
  { id: '3', name: 'Relaxation', songIds: [] }
]

export default createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    // increment: (state: ) => state + 1,
    // decrement: (state) => state - 1,
  }
})
