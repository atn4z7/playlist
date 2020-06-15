import React from 'react'
import { View } from 'react-native'
import DancingMusic from 'views/common/DancingMusic'
import Text from 'views/common/Text'
import styles from './styles'

const Empty = () => (
  <View>
    <DancingMusic />
    <View style={styles.textContainer}>
      <Text variation="body">Add your first song</Text>
      <Text variation="caption">Tap the button above!</Text>
    </View>
  </View>
)

export default Empty
