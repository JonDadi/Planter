import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

import { GET } from '../utils/http';
import { GET_IMAGE,  POST_IMAGE} from './types';

function* fetchImage({ imageId }) {
  try {
    
    const response = yield call(GET, 'images?image='+imageId);
    yield put({type: GET_IMAGE.SUCCESS, payload: {response, imageId }})
  } catch (e){
    yield put({type: GET_IMAGE.ERROR, response: e.message})
  }
}

function* postPlant({ payload }) {
  try {

    const response = yield call(POST_IMAGE, 'images', payload);
    yield put({type: POST_IMAGE.SUCCESS, payload: response.data})
  } catch (e){
    yield put({type: POST_IMAGE.ERROR, response: e.message})
  }
}

export default function* sagas() {
  yield takeEvery(GET_IMAGE.REQUEST, fetchImage)
  yield takeEvery(POST_IMAGE.REQUEST, postPlant)
}
