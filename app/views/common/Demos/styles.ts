import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const CONTAINER_HEIGHT = dimension.fullHeight * 0.67
const SEPARATOR_HEIGHT = dimension.fullHeight * 0.025

export default StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT
  },
  separator: {
    height: SEPARATOR_HEIGHT
  }
})
