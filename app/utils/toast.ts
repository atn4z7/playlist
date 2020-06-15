import Toast from 'react-native-root-toast'

const options = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.CENTER,
  shadow: false,
  animation: true,
  hideOnPress: false,
  opacity: 1,
  containerStyle: {
    borderRadius: 20,
    paddingHorizontal: 25
  },
  delay: 0
}

export const show = (message: string) => Toast.show(message, options)
