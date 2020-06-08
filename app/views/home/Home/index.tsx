import React from 'react'
import { StatusBar } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import Header from 'views/common/Header'
import Background from 'views/common/Background'
import { playlistsSelectors } from 'selectors'
import { StoreState } from 'types'
import List from './List'

const { getPlaylists } = playlistsSelectors

const Home = ({ playlists }: PropsFromRedux) => {
  return (
    <Background>
      <StatusBar barStyle="light-content" />
      <Header title="Playlists" />
      <List data={playlists} />
    </Background>
  )
}

const mapStateToProps = (state: StoreState) => ({
  playlists: getPlaylists(state)
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Home)
