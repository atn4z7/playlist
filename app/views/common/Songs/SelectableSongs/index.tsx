import React from 'react'
import { View, FlatList } from 'react-native'
import { Song as SongType } from 'types'
import Song from '../Song'
import styles from '../styles'

type SongsProps = {
  songs: Array<SongType>
  onSongSelected: (songId: string) => void
  selected: {
    [songId: string]: boolean
  }
}

const SelectableSongs = ({ songs, onSongSelected, selected }: SongsProps) => {
  const keyExtractor = (item: SongType, index: number) => {
    // using a combination of index and song id to allow duplicate songs
    return `${index}-${item.id}`
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: SongType }) => {
    const checked = selected[item.id]
    return (
      <Song
        data={item}
        onPress={onSongSelected}
        checked={checked}
        showCheckBox
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

export default SelectableSongs
