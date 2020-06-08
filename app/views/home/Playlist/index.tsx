import React, { useLayoutEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { playlistsSelectors, songsSelectors } from 'selectors'
import Background from 'views/common/Background'
import TextButton from 'views/common/TextButton'
import Header from 'views/common/Header'
import { Songs } from 'views/common/Songs'
import { getGradient } from 'styles'
import { StoreState, PlaylistSceneProps } from 'types'

const { getPlaylist } = playlistsSelectors
const { getSongsWithIds } = songsSelectors

type PlaylistProps = PropsFromRedux & PlaylistSceneProps

const Playlist = ({
  navigation,
  playlistId,
  name,
  songs,
  colors
}: PlaylistProps) => {
  useLayoutEffect(() => {
    const goToAddSongs = () => {
      navigation.navigate('AddSongs', { playlistId })
    }

    navigation.setOptions({
      headerRight: () => <TextButton onPress={goToAddSongs} title="ADD SONGS" />
    })
  }, [navigation, playlistId])

  return (
    <Background gradient={getGradient(colors)}>
      <Header title={name} />
      <Songs songs={songs} />
    </Background>
  )
}

const mapStateToProps = (state: StoreState, props: PlaylistSceneProps) => {
  const { playlistId } = props.route.params
  const playlist = getPlaylist(state, playlistId)
  const name = playlist.name
  const colors = playlist.colors || []
  const songIds = playlist.songIds || []
  const songs = getSongsWithIds(state, songIds)

  return { playlistId, name, songs, colors }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Playlist)
