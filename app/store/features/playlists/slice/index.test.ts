import { reducer, actions } from './index'

const { addSongs } = actions

describe(addSongs.type, () => {
  it('should add songs to playlist successfully', () => {
    const testState = {
      byId: {
        '1': {
          id: '1',
          name: 'Work',
          songIds: [],
          icon: 'work',
          colors: ['#FFD200', '#9C5700']
        },
        '2': {
          id: '2',
          name: 'Roadtrip',
          songIds: [],
          icon: 'directions-car',
          colors: ['#34E89E', '#0F3443']
        }
      },
      allIds: ['1', '2']
    }

    const testSondIds = ['4', '5']
    const testPlaylistId = '1'
    const testAction = addSongs({
      songIds: testSondIds,
      playlistId: testPlaylistId
    })

    const expectedState = {
      byId: {
        '1': {
          id: '1',
          name: 'Work',
          songIds: ['4', '5'],
          icon: 'work',
          colors: ['#FFD200', '#9C5700']
        },
        '2': {
          id: '2',
          name: 'Roadtrip',
          songIds: [],
          icon: 'directions-car',
          colors: ['#34E89E', '#0F3443']
        }
      },
      allIds: ['1', '2']
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })

  it("should add songs to playlist's existing list", () => {
    const testState = {
      byId: {
        '1': {
          id: '1',
          name: 'Work',
          songIds: ['1', '2'],
          icon: 'work',
          colors: ['#FFD200', '#9C5700']
        },
        '2': {
          id: '2',
          name: 'Roadtrip',
          songIds: [],
          icon: 'directions-car',
          colors: ['#34E89E', '#0F3443']
        }
      },
      allIds: ['1', '2']
    }

    const testSondIds = ['4', '5']
    const testPlaylistId = '1'
    const testAction = addSongs({
      songIds: testSondIds,
      playlistId: testPlaylistId
    })

    const expectedState = {
      byId: {
        '1': {
          id: '1',
          name: 'Work',
          songIds: ['1', '2', '4', '5'],
          icon: 'work',
          colors: ['#FFD200', '#9C5700']
        },
        '2': {
          id: '2',
          name: 'Roadtrip',
          songIds: [],
          icon: 'directions-car',
          colors: ['#34E89E', '#0F3443']
        }
      },
      allIds: ['1', '2']
    }
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })

  it('should not add songs when playlist does not exist', () => {
    const testState = {
      byId: {
        '1': {
          id: '1',
          name: 'Work',
          songIds: [],
          icon: 'work',
          colors: ['#FFD200', '#9C5700']
        },
        '2': {
          id: '2',
          name: 'Roadtrip',
          songIds: [],
          icon: 'directions-car',
          colors: ['#34E89E', '#0F3443']
        }
      },
      allIds: ['1', '2']
    }

    const testSondIds = ['4', '5']
    const testPlaylistId = '4'
    const testAction = addSongs({
      songIds: testSondIds,
      playlistId: testPlaylistId
    })

    const expectedState = testState
    expect(reducer(testState, testAction)).toEqual(expectedState)
  })
})
