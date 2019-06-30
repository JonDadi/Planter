import { call, put, takeLatest } from 'redux-saga/effects'

import { GET, POST, POST_IMAGE } from '../utils/http';
import { GET_PRODUCE,  POST_PRODUCE} from './types';

function* fetchProduce(plantId) {
  try {
    const response = yield call(GET, `plants/${plantId}/produce`);
    yield put({type: GET_PRODUCE.SUCCESS, payload: response.data})
  } catch (e){
    yield put({type: GET_PRODUCE.ERROR, response: e.message})
  }
}

function* postProduce({ payload }) {
  const { plantId, image, description, date, weight, imageId } = payload;
  const params = { description, date, weight };
  console.log("í sögu ", payload);
  try {
    const response = yield call(POST, `plants/${plantId}/produce`, params);
    yield call(POST_IMAGE, `images`, { image, imageId })
    
    yield put({type: POST_PRODUCE.SUCCESS, payload: response.data})
  } catch (e){
    yield put({type: POST_PRODUCE.ERROR, response: e.message})
  }
}

export default function* sagas() {
  yield takeLatest(GET_PRODUCE.REQUEST, fetchProduce)
  yield takeLatest(POST_PRODUCE.REQUEST, postProduce)
}
