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

const { getCurrent, getIsPlaying } = currentSelectors
const { getSongWithId } = songsSelectors

const NowPlayingBar = ({
  hasNeverPlayed,
  currentSong,
  isPlaying,
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
      <View>
        <Text>{currentSong.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        hitSlop={size.hitSlop}
        onPress={onPress}>
        <Text variation="button">{isPlaying ? 'pause' : 'play'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state: StoreState) => {
  const { songId, playlistId } = getCurrent(state)

  const hasNeverPlayed = songId === '' && playlistId === ''
  const currentSong = getSongWithId(state, songId)
  const isPlaying = getIsPlaying(state)

  return { hasNeverPlayed, currentSong, isPlaying }
}

const mapDispatchToProps = {
  pause: currentActions.pause,
  resume: currentActions.resume
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NowPlayingBar)
