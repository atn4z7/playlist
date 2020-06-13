import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const WIDTH = dimension.fullWidth
const HEIGHT = dimension.fullHeight * 0.14

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'gray'
  },
  buttonContainer: {}
})
