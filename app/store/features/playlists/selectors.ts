import get from 'lodash/get'
import { PlayList, StoreState } from 'types'

const emptyArr: [] = []
const emptyObj = {}

export const getPlaylists = (state: StoreState): Array<PlayList> => {
  const allIds = get(state, 'playlists.allIds', emptyArr)
  return allIds.map((id: string) =>
    get(state, `playlists.byId.${id}`, emptyObj)
  )
}

export const getSongIdsOfPlaylist = (
  state: StoreState,
  playlistId: string
): Array<string> => {
  return get(state, `playlists.byId.${playlistId}.songIds`, emptyArr)
}
