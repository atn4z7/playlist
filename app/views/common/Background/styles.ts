import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const PADDING_HORIZONTAL = dimension.fullWidth * 0.05

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL
  },
  background: {
    ...StyleSheet.absoluteFillObject
  }
})
