import React from 'react'
import { View } from 'react-native'
// temp workaround until https://github.com/software-mansion/react-native-reanimated/pull/822 is deployed
// @ts-ignore
import Animated, { interpolateNode } from 'react-native-reanimated'
import styles from './styles'

const { Clock, Value } = Animated

type TimeTrackerProps = {
  position: number
  duration: number
  width: number
}

class TimeTracker extends React.Component<TimeTrackerProps> {
  clock: Animated.Clock
  animation: Animated.Value<number>

  constructor(props: TimeTrackerProps) {
    super(props)
    this.clock = new Clock()
    this.animation = new Value<number>(this.props.position)
  }

  componentDidUpdate() {
    this.animation.setValue(this.props.position)
  }

  render() {
    const { duration, width } = this.props
    const widthNode = interpolateNode(this.animation, {
      inputRange: [0, duration],
      outputRange: [0, width]
    })

    const backgroundStyle = [styles.background, { width }]
    const progressStyle = [styles.progress, { width: widthNode }]

    return (
      <View>
        <View style={backgroundStyle} />
        <Animated.View style={progressStyle} />
      </View>
    )
  }
}

export default TimeTracker
