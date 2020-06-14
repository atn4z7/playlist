import { StoreState } from 'types'

const emptyObj = {}
const emptyArr: [] = []

export const getPlaylists = (state: StoreState) => {
  const allIds = state.playlists.allIds
  return allIds.map((id) => state.playlists.byId[id])
}

export const getPlaylist = (state: StoreState, playlistId: string) => {
  return state.playlists.byId[playlistId] || emptyObj
}

export const getPlaylistSongIds = (state: StoreState, playlistId: string) => {
  return state.playlists.byId[playlistId]?.songIds || emptyArr
}
