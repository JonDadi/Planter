import { call, put, takeLatest } from 'redux-saga/effects'

import { GET, POST } from '../utils/http';
import { GET_WATERINGS,  POST_WATERING} from './types';

function* fetchWaterings({ plantId }) {
  try {
    const response = yield call(GET, `plants/${plantId}/waterings`);
    yield put({type: GET_WATERINGS.SUCCESS, payload: response.data})
  } catch (e){
    yield put({type: GET_WATERINGS.ERROR, response: e.message})
  }
}

function* postWatering({ payload }) {
  const { date, amount, plantId } = payload;
  const params = {
     date, 
     amount, 
//   fertilizer,
  };
  try {
    const response = yield call(POST, `plants/${plantId}/waterings`, params);

    yield put({type: POST_WATERING.SUCCESS, data: response.data})
    
  } catch (e){
    yield put({type: POST_WATERING.ERROR, response: e.message})
  }
}

export default function* sagas() {
  yield takeLatest(GET_WATERINGS.REQUEST, fetchWaterings)
  yield takeLatest(POST_WATERING.REQUEST, postWatering)
}
