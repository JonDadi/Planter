import { GET_PRODUCE, POST_PRODUCE } from './types';

export const getProduce = {
    request: (plantId) => ({ type: GET_PRODUCE.REQUEST, plantId, }),
    success: (payload) => ({
      type: GET_PRODUCE.SUCCESS,
      payload,
    }),
    error: (error) => ({
      type: GET_PRODUCE.ERROR,
      error
    })
}

export const postProduce = {
  request: (data) => ({ 
    type: POST_PRODUCE.REQUEST, 
    payload: data,
  }),
  success: () => ({
    type: POST_PRODUCE.SUCCESS,
  }),
  error: (error) => ({
    type: POST_PRODUCE.ERROR,
    error,
  })
}

