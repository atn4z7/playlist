import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'

type CurrentState = {
  songId: string
  playlistId: string
  isPlaying: boolean
}

type SetCurrentPayload = {
  songId: string
  playlistId: string
}

type PlayPayload = {
  songId: string
  playlistId: string
}

const initialState: CurrentState = {
  songId: '',
  playlistId: '',
  isPlaying: false
}

const name = 'current'

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<SetCurrentPayload>) {
      const { songId, playlistId } = action.payload
      state.songId = songId
      state.playlistId = playlistId
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload
    }
  }
})

const play = createAction<PlayPayload>(`${name}/play`)
const pause = createAction(`${name}/pause`)
const resume = createAction(`${name}/resume`)
const stop = createAction(`${name}/stop`)

const actions = { ...slice.actions, play, pause, resume, stop }
const reducer = slice.reducer

export { actions, reducer }
