import get from 'lodash/get'

const emptyArr = []
const emptyObj = {}

export const getAllSongs = (state) => {
  const allIds = get(state, 'songs.allIds', emptyArr)
  return allIds.map((id) => get(state, `songs.byId.${id}`, emptyObj))
}

export const getSongsWithIds = (state, songIds) => {
  return songIds.map((id) => get(state, `songs.byId.${id}`, emptyObj))
}
