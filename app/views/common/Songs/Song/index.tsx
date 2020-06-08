import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Text from 'views/common/Text'
import { Song as SongType } from 'types'
import styles from './styles'

const checkedImg = require('../../../../assets/images/checked.png')
const uncheckedImg = require('../../../../assets/images/unchecked.png')

type SongProps = {
  data: SongType
  onPress?: (songId: string) => void
  checked?: boolean
  showCheckBox?: boolean
}

const Song = ({
  data: { id, name, artist },
  onPress,
  checked,
  showCheckBox
}: SongProps) => {
  const renderCheckBox = () => {
    const source = checked ? checkedImg : uncheckedImg
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
    <TouchableOpacity key={id} onPress={() => onPress && onPress(id)}>
      <View style={styles.container}>
        {showCheckBox ? renderCheckBox() : null}
        {renderInfo()}
      </View>
    </TouchableOpacity>
  )
}

export default Song
