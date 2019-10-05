import { GET_WATERINGS, POST_WATERING } from './types';

let defaultState = {
    waterings: [],
  }
  
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case GET_WATERINGS.SUCCESS:
        return {
          ...state,
          waterings: [state.waterings, ...action.payload],
        }   
      case POST_WATERING.SUCCESS:
        const copy = [...state.plants];
        copy.push(action.data)
        return {
            ...state,
            waterings: copy,
          }
      case POST_WATERING.ERROR: {
        return {
          ...state,
        }
      }
      default:
        return state;
    }
  };
  
  export default reducer;