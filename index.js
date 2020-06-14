/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native'
import App from './app/index'
import { name as appName } from './app.json'

YellowBox.ignoreWarnings(
  ['Require cycle: app/store/features/current/index.ts'],
  ['Unable to find module for UIManager']
)

AppRegistry.registerComponent(appName, () => App)
