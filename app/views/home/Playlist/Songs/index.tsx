import React from 'react'
import { View, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { Song as SongType } from 'types'
import { currentActions } from 'actions'
import Empty from './Empty'
import Song from './Song'
import styles from './styles'

type SongsProps = {
  songs: SongType[]
  playlistId: string
}

const { play } = currentActions

const Songs = ({ songs, playlistId }: SongsProps) => {
  const dispatch = useDispatch()

  const keyExtractor = (item: SongType) => item.id

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: SongType }) => {
    const onPress = () => {
      dispatch(play({ songId: item.id, playlistId }))
    }

    return <Song data={item} onPress={onPress} />
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={songs}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={Empty}
    />
  )
}

export default Songs
