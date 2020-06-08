import get from 'lodash/get'
import { Song, StoreState } from 'types'

const emptyArr: [] = []
const emptyObj = {}

export const getAllSongs = (state: StoreState): Array<Song> => {
  const allIds = get(state, 'songs.allIds', emptyArr)
  return allIds.map((id: string) => get(state, `songs.byId.${id}`, emptyObj))
}

export const getSongsWithIds = (
  state: StoreState,
  songIds: Array<string>
): Array<Song> => {
  return songIds.map((id) => get(state, `songs.byId.${id}`, emptyObj))
}
