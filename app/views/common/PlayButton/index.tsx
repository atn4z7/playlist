import React from 'react'
import { TouchableOpacity, Image, ImageStyle } from 'react-native'
import { size } from 'styles'
import styles from './styles'

const playImg = require('../../../assets/images/play.png')
const pauseImg = require('../../../assets/images/pause.png')

type PlayButtonProps = {
  onPress: () => void
  isPlaying: boolean
  style?: ImageStyle
}

const PlayButton = ({ onPress, isPlaying, style }: PlayButtonProps) => {
  const buttonImg = isPlaying ? pauseImg : playImg
  const buttonImgStyle = [styles.buttonImg]
  style && buttonImgStyle.push(style)

  return (
    <TouchableOpacity onPress={onPress} hitSlop={size.hitSlop}>
      <Image style={buttonImgStyle} source={buttonImg} />
    </TouchableOpacity>
  )
}

export default PlayButton
