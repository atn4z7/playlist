import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const SPACE_HEIGHT = dimension.fullHeight * 0.003
export const ICON_SIZE = dimension.fullWidth * 0.1

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  infoContainer: {
    justifyContent: 'center'
  },
  space: {
    height: SPACE_HEIGHT
  }
})
