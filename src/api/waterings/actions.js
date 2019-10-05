import { GET_WATERINGS, POST_WATERING } from './types';

export const getWaterings = {
    request: (plantId) => ({ 
      type: GET_WATERINGS.REQUEST,
      plantId,
    }),
    success: (payload) => ({
      type: GET_WATERINGS.SUCCESS,
      payload,
    }),
    error: (error) => ({
      type: GET_WATERINGS.ERROR,
      error
    })
}

export const postWatering = {
  request: (data) => ({ 
    type: POST_WATERING.REQUEST, 
    payload: data
  }),
  success: (data) => ({
    type: POST_WATERING.SUCCESS,
    payload: data,
  }),
  error: (error) => ({
    type: POST_WATERING.ERROR,
    error
  })
}

