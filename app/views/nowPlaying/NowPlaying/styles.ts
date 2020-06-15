import { StyleSheet } from 'react-native'
import { color, dimension } from 'styles'

const HEADER_MARGIN_TOP = dimension.fullHeight * 0.013
const ARTWORK_SIZE = dimension.fullWidth * 0.8
const VERTICAL_SPACE_HEIGHT = dimension.fullHeight * 0.027
const HORIZONTAL_SPACE_HEIGHT = dimension.fullWidth * 0.12
const TRACKER_WIDTH = ARTWORK_SIZE
const CONTROLS_WIDTH = dimension.fullWidth * 0.6
const CONTROLS_HEIGHT = dimension.fullHeight * 0.24
const PLAY_BTN_SIZE = dimension.fullWidth * 0.19
const NEXT_BTN_WIDTH = dimension.fullWidth * 0.05
const NEXT_BTN_HEIGHT = (NEXT_BTN_WIDTH * 108) / 114

export default StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEADER_MARGIN_TOP
  },
  artworkContainer: {
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: color.shadow,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5
  },
  artwork: {
    height: ARTWORK_SIZE,
    width: ARTWORK_SIZE
  },
  verticalSpace: {
    height: VERTICAL_SPACE_HEIGHT
  },
  horizontalSpace: {
    width: HORIZONTAL_SPACE_HEIGHT
  },
  trackerContainer: {
    width: TRACKER_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  songInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlsContainer: {
    height: CONTROLS_HEIGHT,
    width: CONTROLS_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playButton: {
    height: PLAY_BTN_SIZE,
    width: PLAY_BTN_SIZE
  },
  nextButton: {
    height: NEXT_BTN_HEIGHT,
    width: NEXT_BTN_WIDTH
  },
  prevButton: {
    height: NEXT_BTN_HEIGHT,
    width: NEXT_BTN_WIDTH,
    transform: [{ rotateY: '180deg' }]
  }
})
