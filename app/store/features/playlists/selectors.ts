import get from 'lodash/get'

const emptyArr = []
const emptyObj = {}

export const getPlaylists = (state) => {
  const allIds = get(state, 'playlists.allIds', emptyArr)
  return allIds.map((id) => get(state, `playlists.byId.${id}`, emptyObj))
}

export const getSongIdsOfPlaylist = (state, playlistId) => {
  return get(state, `playlists.byId.${playlistId}.songIds`, emptyArr)
}
