import React from 'react'
import { View, TouchableOpacity, Image, ImageStyle } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import moment from 'moment'
import { size } from 'styles'
import { StoreState } from 'types'
import { currentActions } from 'actions'
import { currentSelectors, playlistsSelectors, songsSelectors } from 'selectors'
import { getGradient } from 'styles'
import Text from 'views/common/Text'
import Background from 'views/common/Background'
import PlayButton from 'views/common/PlayButton'
import styles from './styles'

type NowPlayingProps = PropsFromRedux

const nextImg = require('../../../assets/images/next.png')

const {
  getCurrent,
  getIsPlaying,
  getPlaybackPosition,
  getSongDuration
} = currentSelectors
const { getSongWithId } = songsSelectors
const { getPlaylistColor, getPlaylistName } = playlistsSelectors

const NowPlaying = ({
  hasNeverPlayed,
  currentSong,
  isPlaying,
  position,
  duration,
  colors,
  playlistName,
  pause,
  resume,
  next,
  previous
}: NowPlayingProps) => {
  if (hasNeverPlayed) {
    return null
  }

  const { artwork, artist, name } = currentSong

  const onPlayPress = () => {
    if (isPlaying) {
      pause()
    } else {
      resume()
    }
  }

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text variation="button">{'Playing From Playlist'}</Text>
        <Text variation="body">{playlistName}</Text>
      </View>
    )
  }

  const renderArtwork = () => {
    const source = { uri: artwork }
    return (
      <View style={styles.artworkContainer}>
        <Image source={source} style={styles.artwork} />
      </View>
    )
  }

  const renderSpace = () => <View style={styles.space} />

  const formatTime = (seconds: number) => {
    return moment
      .utc(moment.duration(seconds, 'seconds').asMilliseconds())
      .format('m:ss')
  }

  const renderTracker = () => {
    return (
      <View style={styles.trackerContainer}>
        <Text variation="caption">{formatTime(position)}</Text>
        <Text>{formatTime(duration)}</Text>
      </View>
    )
  }

  const renderSongInfo = () => {
    return (
      <View style={styles.songInfoContainer}>
        <Text variation="body">{name}</Text>
        <Text variation="caption">{artist}</Text>
      </View>
    )
  }

  const renderTransitionBtn = (onPress: () => void, style: ImageStyle) => {
    return (
      <TouchableOpacity onPress={onPress} hitSlop={size.hitSlop}>
        <Image style={style} source={nextImg} />
      </TouchableOpacity>
    )
  }

  const renderControls = () => {
    const goToNextSong = () => {
      next()
    }
    const goToPreviousSong = () => {
      previous()
    }

    return (
      <View style={styles.controlsContainer}>
        {renderTransitionBtn(goToPreviousSong, styles.prevButton)}
        <PlayButton
          onPress={onPlayPress}
          isPlaying={isPlaying}
          style={styles.playButton}
        />
        {renderTransitionBtn(goToNextSong, styles.nextButton)}
      </View>
    )
  }

  return (
    <Background gradient={getGradient(colors)}>
      <View style={styles.container}>
        {renderHeader()}
        {renderSpace()}
        {renderArtwork()}
        {renderSpace()}
        {renderTracker()}
        {renderSpace()}
        {renderSongInfo()}
        {renderControls()}
      </View>
    </Background>
  )
}

const mapStateToProps = (state: StoreState) => {
  const { songId, playlistId } = getCurrent(state)

  const hasNeverPlayed = songId === '' && playlistId === ''
  const currentSong = getSongWithId(state, songId)
  const isPlaying = getIsPlaying(state)
  const position = getPlaybackPosition(state)
  const duration = getSongDuration(state)
  const colors = getPlaylistColor(state, playlistId)
  const playlistName = getPlaylistName(state, playlistId)

  return {
    hasNeverPlayed,
    currentSong,
    isPlaying,
    position,
    duration,
    colors,
    playlistName
  }
}

const mapDispatchToProps = {
  pause: currentActions.pause,
  resume: currentActions.resume,
  next: currentActions.next,
  previous: currentActions.previous
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NowPlaying)
