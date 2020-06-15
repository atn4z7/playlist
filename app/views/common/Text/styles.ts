import { StyleSheet } from 'react-native'
import { color, font, dimension } from 'styles'

const BODY_MARGIN_BOTTOM = dimension.fullHeight * 0.003

export default StyleSheet.create({
  headline: {
    color: color.text1,
    fontSize: font.size.xxxl,
    fontWeight: '700'
  },
  body: {
    color: color.text1,
    fontSize: font.size.l,
    fontWeight: '500',
    marginBottom: BODY_MARGIN_BOTTOM
  },
  caption: {
    color: color.text2,
    fontSize: font.size.s,
    fontWeight: '400'
  },
  button: {
    color: color.text1,
    fontSize: font.size.s,
    fontWeight: '500'
  }
})
