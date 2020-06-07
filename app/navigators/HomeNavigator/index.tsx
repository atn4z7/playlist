import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../views/home/Home'
import Playlist from '../../views/home/Playlist'

const Stack = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
