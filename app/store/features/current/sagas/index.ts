import { eventChannel, buffers, SagaIterator, EventChannel } from 'redux-saga'
import {
  delay,
  call,
  select,
  put,
  spawn,
  takeLatest,
  take,
  StrictEffect
} from 'redux-saga/effects'
import * as audio from 'utils/audio'
import * as toast from 'utils/toast'
import log from 'utils/logger'
import { songsSelectors, playlistsSelectors } from 'selectors'
import { actions } from '../slice'
import { getCurrent, getSongDuration, getPlaybackPosition } from '../selectors'

const { getPlaylistSongIds } = playlistsSelectors
const { getSongWithId } = songsSelectors
const {
  play: playAction,
  pause: pauseAction,
  resume: resumeAction,
  next: nextAction,
  previous: previousAction,
  setCurrent,
  setIsPlaying,
  setPosition,
  setDuration
} = actions

enum IndexState {
  NotFound,
  OneAndOnly,
  First,
  Last,
  InOfBounds
}

type SongIndex = { state: IndexState; index: number }

// WORKERS
function* play({
  payload: { songId, playlistId }
}: ReturnType<typeof playAction>): SagaIterator {
  try {
    log('playing song', songId)

    const { url } = yield select(getSongWithId, songId)
    yield put(setCurrent({ songId, playlistId }))

    // debounce by 200ms before attempting to play
    yield delay(200)
    const { durationMillis } = yield call(audio.play, url)

    yield put(setIsPlaying(true))
    yield put(setDuration(durationMillis))

    yield spawn(trackStatus, songId)
  } catch (error) {
    log('failed to play song', error)
  }
}

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

function* pause(): SagaIterator {
  try {
    log('pausing song')
    yield call(audio.pause)
    yield put(setIsPlaying(false))
  } catch (error) {
    log('failed to pause song', error)
  }
}

function* resume(): SagaIterator {
  try {
    let shouldResume = false
    const isInitiated = yield call(audio.isInitiated)

    if (isInitiated) {
      const position = yield select(getPlaybackPosition)
      const duration = yield select(getSongDuration)
      const hasFinished = position === duration

      if (!hasFinished) {
        shouldResume = true
      }
    }

    if (shouldResume) {
      log('resuming song')
      yield call(audio.resume)
    } else {
      log('playing from beginning as song is not initiated or has finished')
      const { songId } = yield select(getCurrent)
      const { url } = yield select(getSongWithId, songId)

      yield call(audio.play, url)
      yield spawn(trackStatus, songId)
    }

    yield put(setIsPlaying(true))
  } catch (error) {
    log('failed to resume song', error)
  }
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

function* next(): SagaIterator {
  try {
    const { songId, playlistId } = yield select(getCurrent)
    const songIds = yield select(getPlaylistSongIds, playlistId)
    const { state, index }: SongIndex = yield call(
      getSongIndex,
      songId,
      songIds
    )

    switch (state) {
      case IndexState.OneAndOnly:
      case IndexState.Last: {
        const isInitiated = yield call(audio.isInitiated)

        if (isInitiated) {
          const { isPlaying } = yield call(audio.getStatus)

          if (!isPlaying) {
            // player has finished playing all songs
            yield put(setIsPlaying(false))
          }
        }

        yield call(toast.show, 'end of playlist reached')

        break
      }
      case IndexState.First:
      case IndexState.InOfBounds: {
        log('playing next song')
        const nextSongId = songIds[index + 1]
        yield put(playAction({ songId: nextSongId, playlistId }))
      }
    }
  } catch (error) {
    log('failed to play next song', error)
  }
}

function* previous(): SagaIterator {
  try {
    const { songId, playlistId } = yield select(getCurrent)
    const songIds = yield select(getPlaylistSongIds, playlistId)
    const { state, index }: SongIndex = yield call(
      getSongIndex,
      songId,
      songIds
    )

    switch (state) {
      case IndexState.OneAndOnly:
      case IndexState.First: {
        log('reached beginning - replaying current song')
        yield put(playAction({ songId: songId, playlistId }))
        break
      }
      case IndexState.Last:
      case IndexState.InOfBounds: {
        log('playing previous song')
        const nextSongId = songIds[index - 1]
        yield put(playAction({ songId: nextSongId, playlistId }))
      }
    }
  } catch (error) {
    log('failed to play previous song', error)
  }
}

// WATCHERS
function* watchPlay() {
  yield takeLatest(playAction, play)
}

function* watchPause() {
  yield takeLatest(pauseAction, pause)
}

function* watchResume() {
  yield takeLatest(resumeAction, resume)
}

function* watchNext() {
  yield takeLatest(nextAction, next)
}

function* watchPrevious() {
  yield takeLatest(previousAction, previous)
}

export default {
  watchers: [
    watchPlay(),
    watchPause(),
    watchResume(),
    watchNext(),
    watchPrevious()
  ],
  workers: {
    play
  }
}
