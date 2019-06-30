import { GET_PRODUCE, POST_PRODUCE } from './types';

let defaultState = {
    produce: [],
    erros: "",
  }
  
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case GET_PRODUCE.SUCCESS:
        return {
          ...state,
          produce: action.payload,
        }   
      case POST_PRODUCE.SUCCESS:  
        return {
            ...state,
          }    
      default:
        return state;
    }
  };
  
  export default reducer;