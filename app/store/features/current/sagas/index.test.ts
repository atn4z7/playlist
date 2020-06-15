import { select, spawn, call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as audio from 'utils/audio'
import * as toast from 'utils/toast'
import { songsSelectors, playlistsSelectors } from 'selectors'
import saga from './index'
import { actions } from '../slice'
import { getCurrent } from '../selectors'
import { trackStatus, shouldResume, getSongIndex, IndexState } from './util'

const { getPlaylistSongIds } = playlistsSelectors
const { getSongWithId } = songsSelectors
const { play: playAction, setCurrent, setIsPlaying, setDuration } = actions

const {
  workers: { play, pause, resume, next, previous }
} = saga

const error = new Error('test')

describe('play', () => {
  const songId = '12345'
  const url = 'google.com'
  const song = { url: url }
  const duration = 1000
  const playlistId = '78'

  it('should play song successfully', () => {
    const status = { durationMillis: duration }
    const testAction = playAction({ songId, playlistId })

    return (
      expectSaga(play, testAction)
        .provide([
          [select(getSongWithId, songId), song],
          [call(audio.play, url), status],
          [spawn(trackStatus, songId), undefined]
        ])
        // should set currently playing song id and playlist id
        .put(setCurrent({ songId, playlistId }))
        // should play the specified url
        .call(audio.play, url)
        // should set song duration
        .put(setDuration(duration))
        // should set is playing
        .put(setIsPlaying(true))
        // should start tracking this song
        .spawn(trackStatus, songId)
        .run()
    )
  })

  it('should handle failed to play song', () => {
    const testAction = playAction({ songId, playlistId })

    return (
      expectSaga(play, testAction)
        .provide([
          [select(getSongWithId, songId), song],
          [call(audio.play, url), throwError(error)]
        ])
        // should set currently playing song id and playlist id
        .put(setCurrent({ songId, playlistId }))
        // should play the specified url
        .call(audio.play, url)
        // should not set song duration
        .not.put(setDuration(duration))
        // should not set is playing
        .not.put(setIsPlaying(true))
        // should not start tracking this song
        .not.spawn(trackStatus, songId)
        .run()
    )
  })
})

describe('pause', () => {
  it('should pause song successfully', () => {
    return (
      expectSaga(pause)
        .provide([[call(audio.pause), undefined]])
        // should pause
        .call(audio.pause)
        // should set is playing to false
        .put(setIsPlaying(false))
        .run()
    )
  })

  it('should handle failed to pause song', () => {
    return (
      expectSaga(pause)
        .provide([[call(audio.pause), throwError(error)]])
        // should pause
        .call(audio.pause)
        // should not set is playing to false
        .not.put(setIsPlaying(false))
        .run()
    )
  })
})

describe('resume', () => {
  it('should resume song', () => {
    return (
      expectSaga(resume)
        .provide([
          [call(shouldResume), true],
          [call(audio.resume), undefined]
        ])
        // should resume
        .call(audio.resume)
        // should set is playing
        .put(setIsPlaying(true))
        .run()
    )
  })

  it('should start song from beginning', () => {
    const songId = '12345'
    const url = 'google.com'
    const song = { url: url }
    return (
      expectSaga(resume)
        .provide([
          [call(shouldResume), false],
          [select(getCurrent), { songId }],
          [select(getSongWithId, songId), song],
          [call(audio.play, url), undefined]
        ])
        // should replay
        .call(audio.play, url)
        // should set is playing
        .put(setIsPlaying(true))
        // should start tracking this song
        .spawn(trackStatus, songId)
        .run()
    )
  })
})

describe('next', () => {
  const playlistId = '234'
  const songId = '1'
  const songIds = ['1', '2', '3']

  const testShouldPlayNextSong = ({
    index,
    state,
    nextSongId
  }: {
    index: number
    state: IndexState
    nextSongId: string
  }) => {
    it('should play next song', () => {
      return (
        expectSaga(next)
          .provide([
            [select(getCurrent), { songId, playlistId }],
            [select(getPlaylistSongIds, playlistId), songIds],
            [call(getSongIndex, songId, songIds), { state, index }]
          ])
          // should signal to play next song in list
          .put(playAction({ songId: nextSongId, playlistId }))
          .run()
      )
    })
  }

  describe('when current song is the only song in list', () => {
    it('and it is not being played', () => {
      return (
        expectSaga(next)
          .provide([
            [select(getCurrent), { songId, playlistId }],
            [select(getPlaylistSongIds, playlistId), songIds],
            [
              call(getSongIndex, songId, songIds),
              { state: IndexState.OneAndOnly, index: 0 }
            ],
            [call(audio.isInitiated), true],
            [call(audio.getStatus), { isPlaying: false }]
          ])
          // should set is playing to false
          // as there is nothing else to play
          .put(setIsPlaying(false))
          // should display a toast to let user know
          .call(toast.show, 'end of playlist reached')
          .run()
      )
    })

    it('and it is is still being played', () => {
      return (
        expectSaga(next)
          .provide([
            [select(getCurrent), { songId, playlistId }],
            [select(getPlaylistSongIds, playlistId), songIds],
            [
              call(getSongIndex, songId, songIds),
              { state: IndexState.OneAndOnly, index: 0 }
            ],
            [call(audio.isInitiated), true],
            [call(audio.getStatus), { isPlaying: true }]
          ])
          // should not set is playing to false
          .not.put(setIsPlaying(false))
          // should display a toast to let user know
          .call(toast.show, 'end of playlist reached')
          .run()
      )
    })
  })

  describe('when current song is the first in list', () => {
    const nextSongId = '2'
    testShouldPlayNextSong({
      state: IndexState.First,
      index: 0,
      nextSongId
    })
  })

  describe('when current song is within the list', () => {
    const nextSongId = '3'
    testShouldPlayNextSong({
      state: IndexState.InOfBounds,
      index: 1,
      nextSongId
    })
  })
})

describe('previous', () => {
  const playlistId = '234'
  const songId = '1'
  const songIds = ['1', '2', '3']

  const testShouldReplaySong = ({
    state,
    index
  }: {
    state: IndexState
    index: number
  }) => {
    it('should replay song', () => {
      return (
        expectSaga(previous)
          .provide([
            [select(getCurrent), { songId, playlistId }],
            [select(getPlaylistSongIds, playlistId), songIds],
            [call(getSongIndex, songId, songIds), { state, index }]
          ])
          // should signal to play the song again
          .put(playAction({ songId: songId, playlistId }))
          .run()
      )
    })
  }

  const testShouldPlayPreviousSong = ({
    state,
    index,
    previousSongId
  }: {
    state: IndexState
    index: number
    previousSongId: string
  }) => {
    it('should play previous song', () => {
      return (
        expectSaga(previous)
          .provide([
            [select(getCurrent), { songId, playlistId }],
            [select(getPlaylistSongIds, playlistId), songIds],
            [call(getSongIndex, songId, songIds), { state, index }]
          ])
          // should signal to play the previous song
          .put(playAction({ songId: previousSongId, playlistId }))
          .run()
      )
    })
  }

  describe('when current song is the only song in list', () => {
    testShouldReplaySong({ state: IndexState.OneAndOnly, index: 0 })
  })

  describe('when current song is the first in list', () => {
    testShouldReplaySong({
      state: IndexState.First,
      index: 0
    })
  })

  describe('when current song is the last in list', () => {
    const previousSongId = '2'
    testShouldPlayPreviousSong({
      state: IndexState.Last,
      index: 2,
      previousSongId
    })
  })

  describe('when current song is within the list', () => {
    const previousSongId = '1'
    testShouldPlayPreviousSong({
      state: IndexState.InOfBounds,
      index: 1,
      previousSongId
    })
  })
})
