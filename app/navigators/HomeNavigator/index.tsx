import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from 'views/home/Home'
import Playlist from 'views/home/Playlist'
import BackButton from 'views/common/BackButton'
import NowPlayingBar from 'views/global/NowPlayingBar'
import { HomeStackParamList } from 'types'
import { transparentHeaderOptions } from '../utils'

const Stack = createStackNavigator<HomeStackParamList>()

const HomeNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={transparentHeaderOptions}
        />
        <Stack.Screen
          name="Playlist"
          component={Playlist}
          options={{
            ...transparentHeaderOptions,
            headerLeft: BackButton
          }}
        />
      </Stack.Navigator>
      <NowPlayingBar />
    </>
  )
}

export default HomeNavigator
