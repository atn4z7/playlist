import React from 'react'
import { View, FlatList } from 'react-native'
import { Song } from 'types'
import Item from './Item'
import styles from './styles'

type ListProps = {
  data: Array<Song>
}

const List = ({ data }: ListProps) => {
  const keyExtractor = (item: Song, index: number) => {
    // using a combination of index and song id to allow duplicate songs
    return `${index}-${item.id}`
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: Song }) => {
    return <Item data={item} />
  }

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={true}
    />
  )
}

export default List
