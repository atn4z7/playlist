import { eventChannel, buffers, SagaIterator, EventChannel } from 'redux-saga'
import { call, select, put, take, StrictEffect } from 'redux-saga/effects'
import * as audio from 'utils/audio'
import log from 'utils/logger'
import { actions } from '../slice'
import { getSongDuration, getPlaybackPosition } from '../selectors'

const { next: nextAction, setPosition } = actions

export enum IndexState {
  NotFound,
  OneAndOnly,
  First,
  Last,
  InOfBounds
}

type SongIndex = { state: IndexState; index: number }

function* processStatus(
  channel: EventChannel<any>,
  status: audio.PlaybackStatus
): SagaIterator {
  if (!status.isLoaded) {
    log('song being unloaded')
    yield call(channel.close)
  } else {
    if (status.isPlaying) {
      yield put(setPosition(status.positionMillis))
    }

    if (status.didJustFinish && !status.isLooping) {
      log('finished playing song')
      yield put(nextAction())
      yield call(channel.close)
    }
  }
}

function* trackStatus(songId: string): SagaIterator {
  const channel = yield call(createStatusChannel)
  log(`start tracking status for ${songId}`)

  try {
    while (true) {
      const { status } = yield take(channel)
      yield call(processStatus, channel, status)
    }
  } finally {
    log(`stop tracking status for ${songId}`)
  }
}

function createStatusChannel() {
  return eventChannel<{ status: audio.PlaybackStatus }>((emitter) => {
    audio.setOnPlaybackStatusUpdate((status) => {
      emitter({ status })
    })

    return () => {}
  }, buffers.expanding())
}

function* getSongIndex(
  songId: string,
  songIds: string[]
): Generator<StrictEffect, SongIndex, any> {
  if (songIds.length === 0) {
    log('playlist has no songs')
    return { state: IndexState.NotFound, index: -1 }
  }

  if (songIds.length === 1) {
    log('playlist has only 1 song')
    return { state: IndexState.OneAndOnly, index: 0 }
  }

  const index = songIds.indexOf(songId)

  if (index === -1) {
    log('song is not in playlist')
    return { state: IndexState.NotFound, index }
  }

  if (index === 0) {
    log('song is the first song')
    return { state: IndexState.First, index }
  }

  if (index === songIds.length - 1) {
    log('song is the last song')
    return { state: IndexState.Last, index }
  }

  return { state: IndexState.InOfBounds, index }
}

function* shouldResume(): SagaIterator {
  const isInitiated = yield call(audio.isInitiated)

  if (isInitiated) {
    const position = yield select(getPlaybackPosition)
    const duration = yield select(getSongDuration)
    const hasFinished = position === duration

    if (!hasFinished) {
      return true
    }
  }

  return false
}

export { processStatus, trackStatus, getSongIndex, shouldResume }
