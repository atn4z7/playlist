import { Audio, AVPlaybackStatus } from 'expo-av'

type OnPlaybackStatusUpdateType = (status: AVPlaybackStatus) => void | null

let playbackInstance: Audio.Sound | null = null

export const play = async (
  uri: string,
  onPlaybackStatusUpdate: OnPlaybackStatusUpdateType
) => {
  if (playbackInstance !== null) {
    // unload the current media from memory and reset instance
    await playbackInstance.unloadAsync()
    playbackInstance = null
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

export const pause = () => playbackInstance?.pauseAsync()

export const stop = () => playbackInstance?.stopAsync()
