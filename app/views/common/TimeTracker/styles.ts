import { StyleSheet } from 'react-native'
import { dimension, color } from 'styles'

const HEIGHT = dimension.fullHeight * 0.0035

export default StyleSheet.create({
  background: {
    backgroundColor: color.accentLight,
    height: HEIGHT
  },
  progress: {
    position: 'absolute',
    height: HEIGHT,
    backgroundColor: color.accent
  }
})
