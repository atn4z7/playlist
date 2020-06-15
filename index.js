/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native'
import App from './app/index'
import { name as appName } from './app.json'

YellowBox.ignoreWarnings(['Require cycle: app/store/features/current/index.ts'])
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps'])
YellowBox.ignoreWarnings(['Warning: componentWillMount'])
YellowBox.ignoreWarnings(['Unable to find module for UIManager'])
YellowBox.ignoreWarnings(['useNativeDriver'])

AppRegistry.registerComponent(appName, () => App)
