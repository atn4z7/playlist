import { Audio, AVPlaybackStatus } from 'expo-av'

type OnPlaybackStatusUpdateType = (status: AVPlaybackStatus) => void | null

let playbackInstance: Audio.Sound | null = null

export const play = async (
  uri: string,
  onPlaybackStatusUpdate: OnPlaybackStatusUpdateType
) => {
  if (playbackInstance !== null) {
    reset()
  }

  const source = { uri }
  const initialStatus = { shouldPlay: true }

  const { sound } = await Audio.Sound.createAsync(
    source,
    initialStatus,
    onPlaybackStatusUpdate
  )

  playbackInstance = sound
}

const checkInstance = () => {
  if (playbackInstance === null) {
    throw new Error('playback not initiated')
  }
}

export const pause = () => {
  checkInstance()
  playbackInstance?.pauseAsync()
}

export const resume = () => {
  checkInstance()
  playbackInstance?.playAsync()
}

export const stop = () => {
  checkInstance()
  playbackInstance?.stopAsync()
}

// unload the current media from memory and reset instance
export const reset = async () => {
  checkInstance()
  await playbackInstance?.unloadAsync()
  playbackInstance = null
}

export const isInitiated = () => playbackInstance !== null
