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

export const getPlaylist = (
  state: StoreState,
  playlistId: string
): PlayList => {
  return get(state, `playlists.byId.${playlistId}`, emptyObj)
}
