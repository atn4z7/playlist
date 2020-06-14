import Toast from 'react-native-root-toast'

// const backgroundColor = '#707070'

const options = {
  duration: Toast.durations.SHORT,
  position: -160,
  shadow: false,
  animation: true,
  hideOnPress: false,
  // backgroundColor,
  opacity: 0.9,
  containerStyle: {
    borderRadius: 20,
    paddingHorizontal: 25
  },
  delay: 0
}

export const show = (message: string) => {
  Toast.show(message, options)
}
