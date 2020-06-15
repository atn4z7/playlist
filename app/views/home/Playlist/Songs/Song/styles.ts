import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const ARTWORK_SIZE = dimension.fullWidth * 0.1
const ARTWORK_MARGIN_RIGHT = dimension.fullWidth * 0.05
const TEXT_CONTAINER_MAX_WIDTH = dimension.fullWidth * 0.74
export const ICON_SIZE = dimension.fullWidth * 0.1

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoContainer: {
    justifyContent: 'center',
    maxWidth: TEXT_CONTAINER_MAX_WIDTH
  },
  artwork: {
    height: ARTWORK_SIZE,
    width: ARTWORK_SIZE,
    marginRight: ARTWORK_MARGIN_RIGHT
  }
})
