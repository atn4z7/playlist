import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Text from 'views/common/Text'
import PlayButton from 'views/common/PlayButton'
import { Song } from 'types'
import styles from './styles'

const checkedImg = require('../../../../../assets/images/checked.png')
const uncheckedImg = require('../../../../../assets/images/unchecked.png')

type DemoProps = {
  data: Song
  onSelected: () => void
  onPlayPress: () => void
  isSelected: boolean
  isPlaying: boolean
}

const Demo = ({
  data: { name, artist },
  onSelected,
  onPlayPress,
  isSelected,
  isPlaying
}: DemoProps) => {
  const renderCheckBox = () => {
    const source = isSelected ? checkedImg : uncheckedImg
    return <Image style={styles.checkImg} source={source} />
  }

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
      <TouchableOpacity onPress={onSelected} style={styles.leftContainer}>
        {renderCheckBox()}
        {renderInfo()}
      </TouchableOpacity>
      <PlayButton onPress={onPlayPress} isPlaying={isPlaying} />
    </View>
  )
}

export default Demo
