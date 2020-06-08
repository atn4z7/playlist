import rootReducer from './store/reducer'

export type NormalizedObjects<T> = {
  byId: { [id: string]: T }
  allIds: string[]
}

export type PlayList = {
  id: string
  name: string
  songIds: Array<string>
  icon: string
  colors: Array<string>
}

export type Song = {
  id: string
  name: string
  artist: string
  url: string
}

export type StoreState = ReturnType<typeof rootReducer>
