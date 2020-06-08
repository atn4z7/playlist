import { Dimensions, StatusBar, Platform } from 'react-native'

// on iOS, status bar is an overlay so no need to subtract
const StatusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0

export const dimension = {
  fullHeight: Dimensions.get('window').height - StatusBarHeight,
  fullWidth: Dimensions.get('window').width
}
