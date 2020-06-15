import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import styles from './styles'

const animation = require('../../../assets/animations/music-visualizer.json')

const Visualizer = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) {
    return null
  }

  return (
    <View style={styles.container}>
      <LottieView autoPlay source={animation} loop style={styles.animation} />
    </View>
  )
}

export default Visualizer
