import { StoreState } from 'types'

const emptyObj = {}

export const getAllSongs = (state: StoreState) => {
  const allIds = state.songs.allIds
  return allIds.map((id) => state.songs.byId[id])
}

export const getSongsWithIds = (state: StoreState, songIds: Array<string>) => {
  return songIds.map((id) => state.songs.byId[id] || emptyObj)
}

export const getSongWithId = (state: StoreState, songId: string) => {
  return state.songs.byId[songId] || emptyObj
}
