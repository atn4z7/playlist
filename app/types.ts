import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import rootReducer from './store/reducer'

// redux types
export type NormalizedObjects<T> = {
  byId: { [id: string]: T }
  allIds: string[]
}

export type StoreState = ReturnType<typeof rootReducer>

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
  artwork: string
  url: string
}

// navigation types
export type RootStackParamList = {
  Home: undefined
  AddSongs: { playlistId: string }
}

export type HomeStackParamList = {
  Home: undefined
  Playlist: { playlistId: string }
}

export type HomeNavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>

export type PlaylistSceneProps = {
  route: RouteProp<HomeStackParamList, 'Playlist'>
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, 'Playlist'>,
    StackNavigationProp<RootStackParamList>
  >
}

export type AddSongsSceneProps = StackScreenProps<
  RootStackParamList,
  'AddSongs'
>
