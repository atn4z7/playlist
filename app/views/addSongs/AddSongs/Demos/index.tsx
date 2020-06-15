import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { currentActions } from 'actions'
import { currentSelectors } from 'selectors'
import { StoreState, Song } from 'types'
import * as audio from 'utils/audio'
import log from 'utils/logger'
import Demo from './Demo'
import styles from './styles'

type DemosProps = {
  songs: Song[]
  onSongSelected: (songId: string) => void
  selected: {
    [songId: string]: boolean
  }
} & PropsFromRedux

const { setIsPlaying } = currentActions
const { getIsPlaying } = currentSelectors

const Demos = ({
  songs,
  onSongSelected,
  selected,
  isGlobalPlaying,
  setIsGlobalPlaying
}: DemosProps) => {
  const [playingSongId, setPlayingSongId] = useState('')

  useEffect(() => {
    return () => {
      // stop playing on unmount
      if (playingSongId !== '') {
        audio.reset()
      }
    }
  }, [playingSongId])

  const keyExtractor = (item: Song) => item.id

  const stopGlobalPlaying = () => {
    if (isGlobalPlaying) {
      setIsGlobalPlaying(false)
    }
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: Song }) => {
    const { id, url } = item
    const isSelected = selected[item.id]
    const isPlaying = item.id === playingSongId

    const onSelected = () => {
      onSongSelected(id)
    }

    const resetPlaying = () => {
      setPlayingSongId('')
    }

    const onPlaybackStatusUpdate = (status: audio.PlaybackStatus) => {
      if (status.isLoaded) {
        if (status.didJustFinish && !status.isLooping) {
          resetPlaying()
        }
      } else {
        if (status.error) {
          log(`player error: ${status.error}`)
          resetPlaying()
        }
      }
    }

    const onPlayPress = async () => {
      if (isPlaying) {
        resetPlaying()
        audio.stop()
      } else {
        stopGlobalPlaying()

        setPlayingSongId(id)
        try {
          await audio.play(url)
          audio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        } catch (error) {
          log(`player error: ${error}`)
          resetPlaying()
        }
      }
    }

    return (
      <Demo
        data={item}
        onSelected={onSelected}
        onPlayPress={onPlayPress}
        isSelected={isSelected}
        isPlaying={isPlaying}
      />
    )
  }

  return (
    <FlatList
      style={styles.container}
      data={songs}
      extraData={selected}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={true}
    />
  )
}

const mapStateToProps = (state: StoreState) => {
  const isGlobalPlaying = getIsPlaying(state)
  return { isGlobalPlaying }
}

const mapDispatchToProps = {
  setIsGlobalPlaying: setIsPlaying
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Demos)
