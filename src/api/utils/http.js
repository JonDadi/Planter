import axios from 'axios';
// application/json
const apiUrl = 'http://localhost:65442/api/';


export const GET = (endpoint) => {
    if (endpoint.indexOf('image') > -1 ) { 
        return axios.get(apiUrl + endpoint, {
            responseType: 'blob',
            timeout: 30000,
            headers: {'Access-Control-Allow-Origin': '*'},
          });
    } else {
        return axios.get(apiUrl + endpoint)
    }
    
}

export const POST = (endpoint, payload) => {
    console.log("payload í post", payload);
    return axios.post(apiUrl + endpoint, payload)
};

export const POST_IMAGE = (endpoint, { image, imageId }) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', image);
    if (imageId) {
        bodyFormData.append('imageId', imageId);
    }
    return axios.post(apiUrl + endpoint, bodyFormData);
}

export const PUT = (endpoint, payload) => (
    axios.post(apiUrl + endpoint, payload)
)

export const DELETE = (endpoint) => (
    axios.delete(apiUrl + endpoint)
)
    
