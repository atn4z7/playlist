import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Text from 'views/common/Text'
import { Song } from 'types'
import styles from './styles'

const Item = ({ data: { id, name, artist } }: { data: Song }) => {
  const renderInfo = () => {
    return (
      <View style={styles.infoContainer}>
        <Text variation="body">{name}</Text>
        <View style={styles.space} />
        <Text variation="caption">{artist}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity key={id} onPress={() => {}}>
      <View style={styles.container}>{renderInfo()}</View>
    </TouchableOpacity>
  )
}

export default Item
