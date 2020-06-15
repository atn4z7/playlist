import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const ARTWORK_SIZE = dimension.fullWidth * 0.13
const ARTWORK_MARGIN_RIGHT = dimension.fullWidth * 0.05
const TEXT_CONTAINER_MAX_WIDTH = dimension.fullWidth * 0.55
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
  leftContainer: {
    flexDirection: 'row'
  },
  artwork: {
    height: ARTWORK_SIZE,
    width: ARTWORK_SIZE,
    marginRight: ARTWORK_MARGIN_RIGHT,
    borderRadius: 4
  }
})
