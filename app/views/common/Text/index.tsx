import React from 'react'
import { Text as RNText } from 'react-native'
import styles from './styles'

// https://material.io/design/typography/the-type-system.html
type TextProps = {
  variation: 'headline' | 'body' | 'caption' | 'button'
  children: React.ReactNode
}

const Text = ({ variation, children }: TextProps) => {
  const style = styles[variation]
  return <RNText style={style}>{children}</RNText>
}

Text.defaultProps = {
  variation: 'caption'
}

export default Text
