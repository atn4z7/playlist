import React from 'react'
import { View, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { color } from 'styles'
import styles from './styles'

type BackgroundProps = {
  colors: Array<string>
  children: React.ReactNode
}

const Background = ({ colors, children }: BackgroundProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={colors} style={styles.background} />
      <SafeAreaView>{children}</SafeAreaView>
    </View>
  )
}
Background.defaultProps = {
  colors: color.background
}

export default Background
