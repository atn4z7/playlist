import React from 'react'
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { size } from 'styles'
import Text from 'views/common/Text'
import { StoreState, HomeNavigationProps } from 'types'
import { currentActions } from 'actions'
import { currentSelectors, songsSelectors } from 'selectors'
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

  return (
    <TouchableWithoutFeedback onPress={onViewPress}>
      <View style={styles.container}>
        <View>
          <Text>{currentSong.name}</Text>
          <Text>{position + '/' + duration}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          hitSlop={size.hitSlop}
          onPress={onPlayPress}>
          <Text variation="button">{isPlaying ? 'pause' : 'play'}</Text>
        </TouchableOpacity>
      </View>
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
