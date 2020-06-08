import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { StackHeaderLeftButtonProps } from '@react-navigation/stack'
import { size } from 'styles'
import styles from './styles'

const backImg = require('../../../assets/images/back-arrow.png')

const BackButton = ({ onPress }: StackHeaderLeftButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      hitSlop={size.hitSlop}
      onPress={onPress}>
      <Image style={styles.image} source={backImg} />
    </TouchableOpacity>
  )
}

export default BackButton
