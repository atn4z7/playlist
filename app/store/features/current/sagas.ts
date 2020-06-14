import { eventChannel, buffers } from 'redux-saga'
import { call, select, put, spawn, takeLatest, take } from 'redux-saga/effects'
import * as audio from 'utils/audio'
import log from 'utils/logger'
import { songsSelectors } from 'selectors'
import { actions } from './slice'
import { getCurrent } from './selectors'

const { getSongWithId } = songsSelectors
const {
  play: playAction,
  pause: pauseAction,
  resume: resumeAction,
  setCurrent,
  setIsPlaying,
  setPosition,
  setDuration
} = actions

// WORKERS
function* play({
  payload: { songId, playlistId }
}: ReturnType<typeof playAction>) {
  try {
    log('playing song', songId)

    const { url } = yield select(getSongWithId, songId)
    const { durationMillis } = yield call(audio.play, url)

    yield put(setIsPlaying(true))
    yield put(setCurrent({ songId, playlistId }))
    yield put(setDuration(durationMillis))

    yield spawn(trackStatus, songId)
  } catch (error) {
    log('failed to play song', error)
  }
}

function* trackStatus(songId: string) {
  const channel = yield call(createStatusChannel)

  try {
    while (true) {
      log(`start tracking status for ${songId}`)
      const { status } = yield take(channel)

      if (!status.isLoaded) {
        log('song being unloaded')
        yield call(channel.close)
      } else {
        if (status.isPlaying) {
          yield put(setPosition(status.positionMillis))
        }

        if (status.didJustFinish && !status.isLooping) {
          log('finished playing song and will stop')
          yield call(channel.close)
          // TODO play next song
        }
      }
    }
  } finally {
    log(`stop tracking status for ${songId}`)
  }
}

function createStatusChannel() {
  return eventChannel((emitter) => {
    audio.setOnPlaybackStatusUpdate((status) => {
      emitter({ status })
    })

    return () => {}
  }, buffers.expanding())
}

function* pause() {
  try {
    log('pausing song')
    yield call(audio.pause)
    yield put(setIsPlaying(false))
  } catch (error) {
    log('failed to pause song', error)
  }
}

function* resume() {
  try {
    const isInitiated = yield call(audio.isInitiated)

    if (isInitiated) {
      log('resuming song')
      yield call(audio.resume)
    } else {
      log('playing from beginning as song is not initiated')
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

// function* stop() {
//   try {
//     log('stopping song')
//     yield call(audio.stop)
//     yield put(setIsPlaying(false))
//   } catch (error) {
//     log('failed to stop song', error)
//   }
// }

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

// function* watchStop() {
//   yield takeLatest(resumeAction, stop)
// }

export default {
  watchers: [watchPlay(), watchPause(), watchResume()],
  workers: {
    play
  }
}
