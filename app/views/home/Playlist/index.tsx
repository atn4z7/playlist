import React, { useLayoutEffect, useEffect } from 'react'
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { songsActions } from 'actions'
import { playlistsSelectors, songsSelectors } from 'selectors'

const { getSongIdsOfPlaylist } = playlistsSelectors
const { getSongsWithIds } = songsSelectors

const Playlist = ({ navigation, playlistId, songs }) => {
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    const goToAddSongs = () => {
      navigation.navigate('AddSongs', { playlistId })
    }

    navigation.setOptions({
      headerRight: () => <Button onPress={goToAddSongs} title="ADD SONGS" />
    })
  }, [navigation, playlistId])

  const renderList = () =>
    songs.map(({ id, name }, index) => {
      // using a combination of index and song id to allow duplicate songs
      const key = `${index}-${id}`

      return (
        <TouchableOpacity key={key} onPress={() => {}}>
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

const mapStateToProps = (state, props) => {
  const { playlistId } = props.route.params
  const songIds = getSongIdsOfPlaylist(state, playlistId)
  const songs = getSongsWithIds(state, songIds)
  console.log(playlistId, songIds, songs)
  return { playlistId, songs }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
