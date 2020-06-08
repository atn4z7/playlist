import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const SPACE_HEIGHT = dimension.fullHeight * 0.003
const CHECK_IMG_SIZE = dimension.fullWidth * 0.1
const CHECK_IMG_MARGIN_RIGHT = dimension.fullWidth * 0.05
export const ICON_SIZE = dimension.fullWidth * 0.1

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoContainer: {
    justifyContent: 'center'
  },
  space: {
    height: SPACE_HEIGHT
  },
  checkImg: {
    height: CHECK_IMG_SIZE,
    width: CHECK_IMG_SIZE,
    marginRight: CHECK_IMG_MARGIN_RIGHT
  }
})
