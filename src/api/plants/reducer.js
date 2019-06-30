import { GET_PLANTS, POST_PLANT } from './types';

let defaultState = {
    plants: [],
    erros: "",
  }
  
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case GET_PLANTS.SUCCESS:
        return {
          ...state,
          plants: action.payload,
        }   
      case POST_PLANT.SUCCESS:
        
        console.log("payload", action);
        const copy = [...state.plants];
        copy.push(action.data)
        return {
            ...state,
            plants: copy,
          }
      case POST_PLANT.ERROR: {
        console.log(action);
        return {
          ...state,
        }
      }
      default:
        return state;
    }
  };
  
  export default reducer;