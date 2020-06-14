import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { size } from 'styles'
import Text from 'views/common/Text'
import { StoreState } from 'types'
import { currentActions } from 'actions'
import { currentSelectors, songsSelectors } from 'selectors'
import styles from './styles'

type NowPlayingProps = PropsFromRedux

const {
  getCurrent,
  getIsPlaying,
  getPlaybackPosition,
  getSongDuration
} = currentSelectors
const { getSongWithId } = songsSelectors

const NowPlaying = ({
  hasNeverPlayed,
  currentSong,
  isPlaying,
  position,
  duration,
  pause,
  resume
}: NowPlayingProps) => {
  if (hasNeverPlayed) {
    return null
  }

  const onPress = () => {
    if (isPlaying) {
      pause()
    } else {
      resume()
    }
  }

  return (
    <View style={styles.container}>
      <Text>{currentSong.name}</Text>
      <TouchableOpacity hitSlop={size.hitSlop} onPress={onPress}>
        <Text variation="button">{isPlaying ? 'pause' : 'play'}</Text>
        <Text>{position + '/' + duration}</Text>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={size.hitSlop} onPress={onPress}>
        <Text variation="button">{'next'}</Text>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={size.hitSlop} onPress={onPress}>
        <Text variation="button">{'previous'}</Text>
      </TouchableOpacity>
    </View>
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

export default connector(NowPlaying)
