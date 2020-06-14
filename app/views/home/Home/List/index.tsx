import React from 'react'
import { View, FlatList } from 'react-native'
import { PlayList } from 'types'
import Item from './Item'
import styles from './styles'

type ListProps = {
  data: PlayList[]
}

const List = ({ data }: ListProps) => {
  const keyExtractor = (item: PlayList) => item.id

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }

  const renderItem = ({ item }: { item: PlayList }) => {
    const { id, name, songIds, icon, colors } = item
    const count = songIds.length
    const description = count > 1 ? `${count} songs` : `${count} song`

    return (
      <Item
        id={id}
        title={name}
        description={description}
        icon={icon}
        colors={colors}
      />
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={false}
    />
  )
}

export default List
