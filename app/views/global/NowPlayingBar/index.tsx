import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image
} from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StoreState, HomeNavigationProps } from 'types'
import { currentActions } from 'actions'
import { currentSelectors, songsSelectors } from 'selectors'
import PlayButton from 'views/common/PlayButton'
import Text from 'views/common/Text'
import styles from './styles'

type NowPlayingBarProps = PropsFromRedux

const {
  getCurrent,
  getIsPlaying,
  getPlaybackPosition,
  getSongDuration
} = currentSelectors
const { getSongWithId } = songsSelectors

const NowPlayingBar = ({
  hasNeverPlayed,
  currentSong,
  isPlaying,
  position,
  duration,
  pause,
  resume
}: NowPlayingBarProps) => {
  const navigation = useNavigation<HomeNavigationProps>()

  if (hasNeverPlayed) {
    return null
  }

  const { name, artist, artwork } = currentSong

  const onViewPress = () => {
    navigation.navigate('NowPlaying')
  }

  const onPlayPress = () => {
    if (isPlaying) {
      pause()
    } else {
      resume()
    }
  }

  const renderInfo = () => {
    return (
      <View style={styles.textContainer}>
        <Text variation="body">{name}</Text>
        <Text variation="caption">{artist}</Text>
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={onViewPress}>
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <Image source={{ uri: artwork }} style={styles.artwork} />
          {renderInfo()}
        </View>
        <PlayButton
          onPress={onPlayPress}
          isPlaying={isPlaying}
          style={styles.playButton}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const mapStateToProps = (state: StoreState) => {
  const { songId, playlistId } = getCurrent(state)

  const hasNeverPlayed = songId === '' && playlistId === ''
  const currentSong = getSongWithId(state, songId)
  const isPlaying = getIsPlaying(state)
  const position = getPlaybackPosition(state)
  const duration = getSongDuration(state)

  return { hasNeverPlayed, currentSong, isPlaying, position, duration }
}

const mapDispatchToProps = {
  pause: currentActions.pause,
  resume: currentActions.resume
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NowPlayingBar)
