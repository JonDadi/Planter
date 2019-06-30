import { all, fork } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import plantSaga from './plants/saga';
import produceSaga from './produce/saga';
import plantReducer from './plants/reducer';
import produceReducer from './produce/reducer';
import imageReducer from './images/reducer';
import imageSaga from './images/saga';

export function* root() {
  yield all([fork(plantSaga)]);
  yield all([fork(produceSaga)]);
  yield all([fork(imageSaga)]);
}

export const reducers = combineReducers({
  plantStore: plantReducer,
  produceStore: produceReducer,
  imageStore: imageReducer,
});
