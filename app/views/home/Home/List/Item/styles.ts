import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const SPACE_HEIGHT = dimension.fullHeight * 0.003
const INFO_PADDING_LEFT = dimension.fullWidth * 0.05
const ICON_PADDING = dimension.fullWidth * 0.035
export const ICON_SIZE = dimension.fullWidth * 0.1

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  iconBg: {
    flex: 0,
    borderRadius: 4,
    padding: ICON_PADDING
  },
  infoContainer: {
    paddingLeft: INFO_PADDING_LEFT,
    justifyContent: 'center'
  },
  space: {
    height: SPACE_HEIGHT
  }
})
