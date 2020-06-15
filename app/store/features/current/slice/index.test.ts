import { reducer, actions } from './index'

const { setCurrent, setIsPlaying, setPosition, setDuration } = actions

const initialState = {
  songId: '',
  playlistId: '',
  isPlaying: false,
  positionMillis: 0,
  durationMillis: 0
}

const emptyObj = { type: 'invalid' }

describe('preconditions', () => {
  it('should return correct initial state', () => {
    expect(reducer(undefined, emptyObj)).toEqual(initialState)
  })
})

describe(setCurrent.type, () => {
  it('should update songId and playlistId', () => {
    const testState = {
      songId: '2',
      playlistId: '4',
      isPlaying: true,
      positionMillis: 1000,
      durationMillis: 3000
    }

    const testSondId = '4'
    const testPlaylistId = '1'
    const testAction = setCurrent({
      songId: testSondId,
      playlistId: testPlaylistId
    })

    const expectedState = {
      songId: '4',
      playlistId: '1',
      isPlaying: true,
      positionMillis: 1000,
      durationMillis: 3000
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })
})

describe(setIsPlaying.type, () => {
  it('should update isPlaying to true', () => {
    const testState = {
      songId: '2',
      playlistId: '4',
      isPlaying: false,
      positionMillis: 1000,
      durationMillis: 3000
    }

    const testAction = setIsPlaying(true)

    const expectedState = {
      songId: '2',
      playlistId: '4',
      isPlaying: true,
      positionMillis: 1000,
      durationMillis: 3000
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })

  it('should update isPlaying to false', () => {
    const testState = {
      songId: '2',
      playlistId: '4',
      isPlaying: true,
      positionMillis: 1000,
      durationMillis: 3000
    }

    const testAction = setIsPlaying(false)

    const expectedState = {
      songId: '2',
      playlistId: '4',
      isPlaying: false,
      positionMillis: 1000,
      durationMillis: 3000
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })
})

describe(setPosition.type, () => {
  it('should update positionMillis', () => {
    const testState = {
      songId: '2',
      playlistId: '4',
      isPlaying: false,
      positionMillis: 1000,
      durationMillis: 3000
    }

    const testAction = setPosition(2000)

    const expectedState = {
      songId: '2',
      playlistId: '4',
      isPlaying: false,
      positionMillis: 2000,
      durationMillis: 3000
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })
})

describe(setDuration.type, () => {
  it('should update durationMillis', () => {
    const testState = {
      songId: '2',
      playlistId: '4',
      isPlaying: false,
      positionMillis: 1000,
      durationMillis: 3000
    }

    const testAction = setDuration(10000)

    const expectedState = {
      songId: '2',
      playlistId: '4',
      isPlaying: false,
      positionMillis: 1000,
      durationMillis: 10000
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })
})
