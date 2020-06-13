import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Text from 'views/common/Text'
import PlayButton from './PlayButton'
import { Song } from 'types'
import styles from './styles'

const checkedImg = require('../../../../assets/images/checked.png')
const uncheckedImg = require('../../../../assets/images/unchecked.png')

type DemoProps = {
  data: Song
  onSelected: () => void
  onPlayPress: () => void
  onFinish: () => void
  isSelected: boolean
  isPlaying: boolean
}

const Demo = ({
  data: { id, name, artist },
  onSelected,
  onPlayPress,
  onFinish,
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
      <TouchableOpacity key={id} onPress={onSelected}>
        <View style={styles.leftContainer}>
          {renderCheckBox()}
          {renderInfo()}
        </View>
      </TouchableOpacity>
      <PlayButton
        url="https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86"
        onPress={onPlayPress}
        onFinish={onFinish}
        isPlaying={isPlaying}
      />
    </View>
  )
}

export default Demo
