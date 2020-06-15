import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import Text from 'views/common/Text'
import Visualizer from 'views/common/Visualizer'
import { currentSelectors } from 'selectors'
import { StoreState, Song as SongType } from 'types'
import styles from './styles'

type Props = {
  data: SongType
  onPress: () => void
}

type SongProps = Props & PropsFromRedux

const { getCurrent, getIsPlaying } = currentSelectors

const Song = ({
  data: { id, name, artist, artwork },
  onPress,
  isPlaying
}: SongProps) => {
  const renderInfo = () => {
    return (
      <View style={styles.infoContainer}>
        <Text variation="body">{name}</Text>
        <Text variation="caption">{artist}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity key={id} onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: artwork }} style={styles.artwork} />
        {renderInfo()}
      </View>
      <Visualizer isVisible={isPlaying} />
    </TouchableOpacity>
  )
}

const mapStateToProps = (state: StoreState, props: Props) => {
  const { id } = props.data

  const { songId: currentSongId } = getCurrent(state)
  const isPlaying = getIsPlaying(state)

  return { isPlaying: id === currentSongId && isPlaying === true }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Song)
