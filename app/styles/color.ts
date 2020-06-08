// common colors
const black = '#000000'
const white = '#ffffff'
const white_87 = 'rgba(255, 255, 255, .87)'
const gradient = ['#141E30', black]

export const color = {
  text1: white,
  text2: white_87,

  // misc
  //androidStatusBar: gallery,
  icon: white
}

export const getGradient = (colors?: Array<string>) => {
  if (!colors || colors.length !== 0) {
    return gradient
  }

  // add black to the gradient
  return [...colors, black]
}
