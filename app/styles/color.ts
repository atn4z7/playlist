// common colors
const black = '#000000'
const black_40 = 'rgba(0, 0, 0, .4)'
const white = '#ffffff'
const white_87 = 'rgba(255, 255, 255, .87)'
const white_20 = 'rgba(255, 255, 255, .2)'
const mine_shaft = '#323232'
const default_gradient = [mine_shaft, black]

export const color = {
  text1: white,
  text2: white_87,
  accent: white,
  accentLight: white_20,
  background: mine_shaft,
  shadow: black_40
}

export const getGradient = (colors?: string[]) => {
  if (!colors || colors.length === 0) {
    return default_gradient
  }

  // add black color to the gradient
  return [...colors, black]
}
