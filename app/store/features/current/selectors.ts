import { StoreState } from 'types'

export const getCurrent = (state: StoreState) => ({
  songId: state.current.songId,
  playlistId: state.current.playlistId
})

export const getIsPlaying = (state: StoreState) => state.current.isPlaying
