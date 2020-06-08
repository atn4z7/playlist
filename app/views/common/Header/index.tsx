import React from 'react'
import { View } from 'react-native'
import Text from 'views/common/Text'
import styles from './styles'

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text variation="headline">{title}</Text>
    </View>
  )
}

export default Header
