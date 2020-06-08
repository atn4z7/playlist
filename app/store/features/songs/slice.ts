import { createSlice } from '@reduxjs/toolkit'
import { NormalizedObjects } from '../types'

type Song = {
  id: string
  name: string
  artist: string
  url: string
}

type SongsState = NormalizedObjects<Song>

const initialState: SongsState = {
  byId: {
    '1': { id: '1', name: 'Dance Monkey', artist: 'Tones And I', url: '' },
    '2': { id: '2', name: 'i love you', artist: 'Billie Eilish', url: '' },
    '3': { id: '3', name: 'From the Ground Up', artist: 'Dan + Shay', url: '' },
    '4': {
      id: '4',
      name: 'Best Part (feat. Daniel Caesar)',
      artist: 'H.E.R.',
      url: ''
    }
  },
  allIds: ['1', '2', '3', '4']
}

export default createSlice({
  name: 'songs',
  initialState,
  reducers: {
    increment: (state) => state
    // decrement: (state) => state - 1,
  }
})
