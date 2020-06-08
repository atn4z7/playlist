import { StyleSheet } from 'react-native'
import { color, font } from 'styles'

export default StyleSheet.create({
  headline: {
    color: color.text1,
    fontSize: font.size.xxxl,
    fontWeight: '700'
  },
  body: {
    color: color.text1,
    fontSize: font.size.l,
    fontWeight: '500'
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
