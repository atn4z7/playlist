import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import Header from 'views/common/Header'
import Background from 'views/common/Background'
import { playlistsSelectors } from 'selectors'
import { PlayList, StoreState } from 'types'
import List from './List'

const { getPlaylists } = playlistsSelectors

type HomeProps = {
  playlists: Array<PlayList>
}

const Home = ({ playlists }: HomeProps) => {
  return (
    <Background>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Header title="Playlists" />
        <List data={playlists} />
      </SafeAreaView>
    </Background>
  )
}

const mapStateToProps = (state: StoreState) => ({
  playlists: getPlaylists(state)
})

export default connect(mapStateToProps, null)(Home)
