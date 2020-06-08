import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from 'views/home/Home'
import Playlist from 'views/home/Playlist'
import BackButton from 'views/common/BackButton'
import { HomeStackParamList } from 'types'

const Stack = createStackNavigator<HomeStackParamList>()

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: BackButton
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator
