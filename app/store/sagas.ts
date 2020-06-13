import { all } from 'redux-saga/effects'
import { sagas as currentSagas } from './features/current'

function* rootSaga() {
  yield all([...currentSagas.watchers])
}

export default rootSaga
