import { GET_IMAGE, POST_IMAGE } from './types';
import { tupleTypeAnnotation } from '@babel/types';

let defaultState = {
    images: new Map(),
    isLoading: false,
    erros: "",
    bla: null,
  }
  
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case GET_IMAGE.SUCCESS:
        const { images } = state;
        const { response, imageId } = action.payload;
        const image = response.data;
        const imageUrl = window.URL.createObjectURL(image)

        const tester = new Map(images)
        tester.set(imageId, imageUrl);

        // TODO 
        // Setja inn virkni sem leyfir notanda að sjá myndina frá API.  Athuga með einvhern filereader gæja
        return {
          ...state,
          isLoading: true,
          images: tester,
        }

      case GET_IMAGE.REQUEST:
        
        return {
          isLoading: true,
          ...state,
        }
      case GET_IMAGE.ERROR:
        return {
            ...state,
          }    
      default:
        return state;
    }
  };
  
  export default reducer;