import { dimension } from './dimension'

// https://github.com/DaniAkash/react-native-responsive-dimensions
export const responsiveFontSize = (size: number) => {
  let result =
    Math.sqrt(
      dimension.fullHeight * dimension.fullHeight +
        dimension.fullWidth * dimension.fullWidth
    ) *
    (size / 100)

  return Math.round(result * 10) / 10
}

export const font = {
  size: {
    xxxl: responsiveFontSize(5),
    xxl: responsiveFontSize(4),
    xl: responsiveFontSize(2.85),
    l: responsiveFontSize(2.4),
    m: responsiveFontSize(2),
    s: responsiveFontSize(1.68),
    xs: responsiveFontSize(1.54),
    xxs: responsiveFontSize(1.37),
    xxxs: responsiveFontSize(1.2)
  }
}
