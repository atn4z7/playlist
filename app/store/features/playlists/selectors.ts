import { StoreState } from 'types'

const emptyObj = {}

export const getPlaylists = (state: StoreState) => {
  const allIds = state.playlists.allIds
  return allIds.map((id) => state.playlists.byId[id])
}

export const getPlaylist = (state: StoreState, playlistId: string) => {
  return state.playlists.byId[playlistId] || emptyObj
}
