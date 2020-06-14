import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { currentActions } from 'actions'
import { currentSelectors } from 'selectors'
import { StoreState, Song } from 'types'
import * as audio from 'utils/audio'
import Demo from './Demo'
import styles from './styles'

type DemosProps = {
  songs: Array<Song>
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

  const keyExtractor = (item: Song, index: number) => {
    // using a combination of index and song id to allow duplicate songs
    return `${index}-${item.id}`
  }

  const stopGlobalPlaying = () => {
    if (isGlobalPlaying) {
      setIsGlobalPlaying(false)
    }
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: Song }) => {
    const id = item.id
    const isSelected = selected[item.id]
    const isPlaying = item.id === playingSongId

    const onSelected = () => {
      onSongSelected(id)
    }

    const resetPlaying = () => {
      setPlayingSongId('')
    }

    const onPlayPress = () => {
      stopGlobalPlaying()

      if (isPlaying) {
        resetPlaying()
      } else {
        setPlayingSongId(id)
      }
    }

    return (
      <Demo
        data={item}
        onSelected={onSelected}
        onPlayPress={onPlayPress}
        onFinish={resetPlaying}
        onError={resetPlaying}
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
