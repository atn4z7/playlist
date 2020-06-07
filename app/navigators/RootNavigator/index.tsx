import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeNavigator from '../HomeNavigator'
import AddSongs from '../../views/global/AddSongs'

const Stack = createStackNavigator()

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddSongs" component={AddSongs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
