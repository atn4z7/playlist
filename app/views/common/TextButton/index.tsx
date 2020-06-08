import React from 'react'
import { TouchableOpacity } from 'react-native'
import { size } from 'styles'
import Text from 'views/common/Text'
import styles from './styles'

type TextButtonProps = {
  title: string
  onPress: () => void
}

const TextButton = ({ title, onPress }: TextButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      hitSlop={size.hitSlop}
      onPress={onPress}>
      <Text variation="button">{title}</Text>
    </TouchableOpacity>
  )
}

export default TextButton
