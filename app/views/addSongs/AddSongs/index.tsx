import React, { useLayoutEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { playlistsActions } from 'actions'
import { playlistsSelectors, songsSelectors } from 'selectors'
import { AddSongsSceneProps, StoreState } from 'types'
import { getGradient } from 'styles'
import Background from 'views/common/Background'
import Header from 'views/common/Header'
import TextButton from 'views/common/TextButton'
import Demos from './Demos'

const { addSongs } = playlistsActions
const { getAllSongs } = songsSelectors
const { getPlaylistColor, getPlaylistSongIds } = playlistsSelectors

type PlaylistProps = PropsFromRedux & AddSongsSceneProps

type SelectedMap = {
  [songId: string]: boolean
}

const initialState = {}

const AddSongs = ({
  navigation,
  playlistId,
  songs,
  colors,
  add
}: PlaylistProps) => {
  const [selected, setSelected] = useState<SelectedMap>(initialState)

  useLayoutEffect(() => {
    const onDonePressed = () => {
      const songIds = []

      for (const [id, isSelected] of Object.entries(selected)) {
        if (isSelected === true) {
          songIds.push(id)
        }
      }

      if (songIds.length > 0) {
        add({ playlistId, songIds })
      }

      navigation.goBack()
    }

    navigation.setOptions({
      headerRight: () => <TextButton onPress={onDonePressed} title="DONE" />
    })
  }, [navigation, add, playlistId, selected])

  const onSongSelected = (songId: string) => {
    const updatedSelected = { ...selected, [songId]: !selected[songId] }
    setSelected(updatedSelected)
  }

  return (
    <Background gradient={getGradient(colors)}>
      <Header title="Add Songs" />
      <Demos
        songs={songs}
        selected={selected}
        onSongSelected={onSongSelected}
      />
    </Background>
  )
}

const mapStateToProps = (state: StoreState, props: AddSongsSceneProps) => {
  const { playlistId } = props.route.params

  const colors = getPlaylistColor(state, playlistId)
  const excludedSongIds = getPlaylistSongIds(state, playlistId)
  const songs = getAllSongs(state, excludedSongIds)

  return { playlistId, songs, colors }
}

const mapDispatchToProps = { add: addSongs }

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AddSongs)
