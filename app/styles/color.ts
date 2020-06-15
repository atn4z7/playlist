// common colors
const black = '#000000'
const white = '#ffffff'
const white_87 = 'rgba(255, 255, 255, .87)'
const mine_shaft = '#323232'
const default_gradient = [mine_shaft, black]

export const color = {
  text1: white,
  text2: white_87,
  background: mine_shaft,

  // misc
  //androidStatusBar: gallery,
  icon: white
}

export const getGradient = (colors?: string[]) => {
  if (!colors || colors.length === 0) {
    return default_gradient
  }

  // add black color to the gradient
  return [...colors, black]
}
