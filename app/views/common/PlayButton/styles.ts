import { StyleSheet, ImageStyle } from 'react-native'
import { dimension } from 'styles'

const IMG_SIZE = dimension.fullWidth * 0.09

type Style = {
  buttonImg: ImageStyle
}

export default StyleSheet.create<Style>({
  buttonImg: {
    width: IMG_SIZE,
    height: IMG_SIZE
  }
})
