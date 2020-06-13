import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList } from 'types'
import AddSongs from 'views/addSongs/AddSongs'
import BackButton from 'views/common/BackButton'
import HomeNavigator from '../HomeNavigator'
import { transparentHeaderOptions } from '../utils'

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSongs"
          component={AddSongs}
          options={{
            ...transparentHeaderOptions,
            headerLeft: BackButton
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
