import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const SPACE_HEIGHT = dimension.fullHeight * 0.003
const CHECK_IMG_SIZE = dimension.fullWidth * 0.09
const CHECK_IMG_MARGIN_RIGHT = dimension.fullWidth * 0.05
const TEXT_CONTAINER_MAX_WIDTH = dimension.fullWidth * 0.74
export const ICON_SIZE = dimension.fullWidth * 0.1

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    justifyContent: 'center',
    maxWidth: TEXT_CONTAINER_MAX_WIDTH
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
