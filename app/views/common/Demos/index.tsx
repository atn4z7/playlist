import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { Song } from 'types'
import Demo from './Demo'
import styles from './styles'

type DemosProps = {
  songs: Array<Song>
  onSongSelected: (songId: string) => void
  selected: {
    [songId: string]: boolean
  }
}

const Demos = ({ songs, onSongSelected, selected }: DemosProps) => {
  const [playingSongId, setPlayingSongId] = useState('')

  const keyExtractor = (item: Song, index: number) => {
    // using a combination of index and song id to allow duplicate songs
    return `${index}-${item.id}`
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

    const onPlayPress = () => {
      if (isPlaying) {
        setPlayingSongId('')
      } else {
        setPlayingSongId(id)
      }
    }

    const onFinish = () => {
      setPlayingSongId('')
    }

    return (
      <Demo
        data={item}
        onSelected={onSelected}
        onPlayPress={onPlayPress}
        onFinish={onFinish}
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

export default Demos
