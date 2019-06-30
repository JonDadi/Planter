import { GET_IMAGE, POST_IMAGE } from './types';

export const getImage = {
    request: (imageId) => ({ type: GET_IMAGE.REQUEST, imageId }),
    success: (payload) => ({
      type: GET_IMAGE.SUCCESS,
      payload,
    }),
    error: (error) => ({
      type: GET_IMAGE.ERROR,
      error
    })
}

export const postImage = {
  request: (image) => ({ 
    type: POST_IMAGE.REQUEST, 
    payload: image
  }),
  success: () => ({
    type: POST_IMAGE.SUCCESS,
  }),
  error: (error) => ({
    type: POST_IMAGE.ERROR,
    error
  })
}

