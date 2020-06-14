import React from 'react'
import { View, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { getGradient } from 'styles'
import styles from './styles'

type BackgroundProps = {
  gradient: string[]
  children: React.ReactNode
}

const Background = ({ gradient, children }: BackgroundProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={gradient} style={styles.background} />
      <SafeAreaView>{children}</SafeAreaView>
    </View>
  )
}
Background.defaultProps = {
  gradient: getGradient()
}

export default Background
