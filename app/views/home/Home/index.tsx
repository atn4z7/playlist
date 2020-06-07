import React from 'react'
import { StyleSheet, StatusBar, Button } from 'react-native'

const Home = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Button
        title="test"
        onPress={() => {
          navigation.navigate('AddSongs')
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({})

export default Home
