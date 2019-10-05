import { 
  GET_PLANTS, 
  POST_PLANT, 
  EDIT_PLANT, 
  DELETE_PLANT, 
} from './types';

export const getPlants = {
    request: () => ({ type: GET_PLANTS.REQUEST }),
    success: (payload) => ({
      type: GET_PLANTS.SUCCESS,
      payload,
    }),
    error: (error) => ({
      type: GET_PLANTS.ERROR,
      error
    }),
}

export const postPlant = {
  request: (data) => ({ 
    type: POST_PLANT.REQUEST, 
    payload: data
  }),
  success: (data) => ({
    type: POST_PLANT.SUCCESS,
    payload: data,
  }),
  error: (error) => ({
    type: POST_PLANT.ERROR,
    error
  }),
}

export const editPlant = {
  request: (data) => ({ 
    type: EDIT_PLANT.REQUEST, 
    payload: data
  }),
  success: (data) => ({
    type: EDIT_PLANT.SUCCESS,
    payload: data,
  }),
  error: (error) => ({
    type: EDIT_PLANT.ERROR,
    error
  }),
}

export const deletePlant = {
  request: (data) => ({ 
    type: DELETE_PLANT.REQUEST, 
    payload: data
  }),
  success: (data) => ({
    type: DELETE_PLANT.SUCCESS,
    payload: data,
  }),
  error: (error) => ({
    type: DELETE_PLANT.ERROR,
    error
  }),
}