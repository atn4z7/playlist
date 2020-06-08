import React from 'react'
import { StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { playlistsSelectors } from 'selectors'

const { getPlaylists } = playlistsSelectors
const Home = ({ navigation, playlists }) => {
  const goToPlaylist = (id) => {
    navigation.navigate('Playlist', { playlistId: id })
  }
  const renderList = () =>
    playlists.map(({ id, name }) => {
      return (
        <TouchableOpacity key={id} onPress={() => goToPlaylist(id)}>
          <Text>{name}</Text>
        </TouchableOpacity>
      )
    })

  return (
    <>
      <StatusBar barStyle="light-content" />
      {renderList()}
    </>
  )
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => ({
  playlists: getPlaylists(state)
})

export default connect(mapStateToProps, null)(Home)
