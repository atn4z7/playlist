import { StoreState } from 'types'

const emptyObj = {}

export const getAllSongs = (state: StoreState, excludedSongIds?: string[]) => {
  const allIds = state.songs.allIds
  if (excludedSongIds && excludedSongIds.length > 0) {
    return allIds
      .filter((id) => !excludedSongIds.includes(id))
      .map((id) => state.songs.byId[id])
  } else {
    return allIds.map((id) => state.songs.byId[id])
  }
}

export const getSongsWithIds = (state: StoreState, songIds: string[]) => {
  return songIds.map((id) => state.songs.byId[id] || emptyObj)
}

export const getSongWithId = (state: StoreState, songId: string) => {
  return state.songs.byId[songId] || emptyObj
}
