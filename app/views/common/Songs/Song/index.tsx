import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Text from 'views/common/Text'
import { Song as SongType } from 'types'
import styles from './styles'

type SongProps = {
  data: SongType
  onPress: () => void
}

const Song = ({ data: { id, name, artist }, onPress }: SongProps) => {
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
    <View style={styles.container}>
      <TouchableOpacity key={id} onPress={onPress}>
        <View style={styles.leftContainer}>{renderInfo()}</View>
      </TouchableOpacity>
    </View>
  )
}

export default Song
