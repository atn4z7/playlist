import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import styles from './styles'

const animation = require('../../../assets/animations/floating-music.json')

const DancingMusic = () => {
  return (
    <View style={styles.container}>
      <LottieView
        resizeMode="cover"
        autoPlay
        source={animation}
        loop
        style={styles.animation}
      />
    </View>
  )
}

export default DancingMusic
