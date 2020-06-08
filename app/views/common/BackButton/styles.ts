import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const IMAGE_HEIGHT = dimension.fullWidth * 0.04
const IMAGE_WIDTH = (IMAGE_HEIGHT * 85) / 75

const CONTAINER_MARGIN_LEFT = dimension.fullWidth * 0.05

export default StyleSheet.create({
  container: {
    marginLeft: CONTAINER_MARGIN_LEFT,
    width: IMAGE_WIDTH * 2
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT
  }
})
