import React, { useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Button
} from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { playlistsActions } from 'actions'
import { songsSelectors } from 'selectors'

const { addSongs } = playlistsActions
const { getAllSongs } = songsSelectors

const AddSongs = ({ navigation, playlistId, songs, addSongs }) => {
  const [selected, setSelected] = useState({})

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    const onDonePressed = () => {
      const songIds = []
      for (const [id, isSelected] of Object.entries(selected)) {
        if (isSelected === true) {
          songIds.push(id)
        }
      }
      if (songIds.length > 0) {
        addSongs({ playlistId, songIds })
        navigation.goBack()
      }
    }

    navigation.setOptions({
      headerRight: () => <Button onPress={onDonePressed} title="DONE" />
    })
  }, [navigation, playlistId, selected])

  const onSongPressed = (id) => {
    const updatedSelected = { ...selected, [id]: !selected[id] }
    setSelected(updatedSelected)
  }

  const renderList = () =>
    songs.map(({ id, name }) => {
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          key={id}
          onPress={() => onSongPressed(id)}>
          <Text>{name}</Text>
          {selected[id] ? <Text> selected</Text> : null}
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
  const songs = getAllSongs(state)
  return { playlistId, songs }
}

const mapDispatchToProps = { addSongs }

export default connect(mapStateToProps, mapDispatchToProps)(AddSongs)
