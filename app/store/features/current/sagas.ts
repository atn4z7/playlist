import {
  call,
  select,
  put,
  fork,
  takeLatest,
  delay,
  takeEvery
} from 'redux-saga/effects'
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
  setIsPlaying
} = actions

const url =
  'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86'
// WORKERS
function* play({
  payload: { songId, playlistId }
}: ReturnType<typeof playAction>) {
  try {
    log('playing song', songId)
    yield call(audio.play, url, null)

    yield put(setIsPlaying(true))
    yield put(setCurrent({ songId, playlistId }))
  } catch (error) {
    log('failed to play song', error)
  }
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
      const { songId } = yield select(getCurrent)
      //const currentSong = yield put(getSongWithId, songId)
      log('playing from beginning as song is not initiated')
      yield call(audio.play, url, null)
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
