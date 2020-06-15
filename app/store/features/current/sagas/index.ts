import { SagaIterator } from 'redux-saga'
import { delay, call, select, put, spawn, takeLatest } from 'redux-saga/effects'
import * as audio from 'utils/audio'
import * as toast from 'utils/toast'
import log from 'utils/logger'
import { songsSelectors, playlistsSelectors } from 'selectors'
import { actions } from '../slice'
import { getCurrent } from '../selectors'
import { trackStatus, shouldResume, getSongIndex } from './util'

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
    if (yield call(shouldResume)) {
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
    play,
    pause,
    resume,
    next,
    previous
  }
}
