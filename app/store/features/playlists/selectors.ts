import { StoreState } from 'types'

const emptyArr: [] = []
const emptyStr = ''

export const getPlaylists = (state: StoreState) => {
  const allIds = state.playlists.allIds
  return allIds.map((id) => state.playlists.byId[id])
}

export const getPlaylistColor = (state: StoreState, playlistId: string) => {
  return state.playlists.byId[playlistId]?.colors || emptyArr
}

export const getPlaylistName = (state: StoreState, playlistId: string) => {
  return state.playlists.byId[playlistId]?.name || emptyStr
}

export const getPlaylistSongIds = (state: StoreState, playlistId: string) => {
  return state.playlists.byId[playlistId]?.songIds || emptyArr
}
