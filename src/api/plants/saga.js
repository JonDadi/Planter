import { call, put, takeLatest } from 'redux-saga/effects'

import { GET, POST, POST_IMAGE } from '../utils/http';
import { GET_PLANTS,  POST_PLANT} from './types';

function* fetchPlants() {
  try {
    const response = yield call(GET, 'plants');
    yield put({type: GET_PLANTS.SUCCESS, payload: response.data})
  } catch (e){
    yield put({type: GET_PLANTS.ERROR, response: e.message})
  }
}

function* postPlant({ payload }) {
  const { name, description, datePlanted, location, images } = payload;
  const params = {
     name, 
     description, 
     datePlanted, 
     locationId: 
     location, 
     imageIds: [...images.keys()],
  };
  try {
    for(const [key, value] of images) {
      yield call(POST_IMAGE, `images`, { image: value.image, imageId: key })
    }

    const response = yield call(POST, 'plants', params);

    yield put({type: POST_PLANT.SUCCESS, data: response.data})
    
  } catch (e){
    yield put({type: POST_PLANT.ERROR, response: e.message})
  }
}

export default function* sagas() {
  yield takeLatest(GET_PLANTS.REQUEST, fetchPlants)
  yield takeLatest(POST_PLANT.REQUEST, postPlant)
}
