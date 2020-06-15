import { StyleSheet } from 'react-native'
import { dimension } from 'styles'

const WIDTH = dimension.fullWidth * 0.095

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: WIDTH
  }
})
