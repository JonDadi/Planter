import { GET_IMAGE, POST_IMAGE } from './types';
import { tupleTypeAnnotation } from '@babel/types';

let defaultState = {
    images: {},
    isLoading: false,
  }
  
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case GET_IMAGE.SUCCESS:
        const images = {...state.images}; // nota spread til að fa rerender
        const { response, imageId } = action.payload;
        const image = response.data;
        const imageUrl = window.URL.createObjectURL(image)

        const tester = images;
        tester[imageId] = imageUrl;
        console.log("mynd sótt");
        // TODO 
        // Setja inn virkni sem leyfir notanda að sjá myndina frá API.  Athuga með einvhern filereader gæja
        return {
          ...state,
          isLoading: false,
          images: tester,
        }

      case GET_IMAGE.REQUEST:
        console.log("Byrja að sækja mynd");
        return {
          isLoading: true,
          ...state,
        }
      case GET_IMAGE.ERROR:
        return {
            isLoading: false,
            ...state,
          }    
      default:
        return state;
    }
  };
  
  export default reducer;