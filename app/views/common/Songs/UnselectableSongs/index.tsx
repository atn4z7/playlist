import React from 'react'
import { View, FlatList } from 'react-native'
import { Song as SongType } from 'types'
import Song from '../Song'
import styles from '../styles'

type SongsProps = {
  songs: Array<SongType>
}

const Songs = ({ songs }: SongsProps) => {
  const keyExtractor = (item: SongType, index: number) => {
    // using a combination of index and song id to allow duplicate songs
    return `${index}-${item.id}`
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: SongType }) => {
    return <Song data={item} />
  }

  return (
    <FlatList
      style={styles.container}
      data={songs}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={true}
    />
  )
}

export default Songs
