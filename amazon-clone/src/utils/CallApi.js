import axios from 'axios';
import { BASE_URL } from './constants';


const config = {

    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
};

// The given JavaScript code defines a function, callApi, which is used to asynchronously make an API call. The function takes a parameter named resource, representing the target resource for the API request.
export const callAPI = async (resource) => {

    // The axios.get method is asynchronous, so it is awaited using the await keyword, and only the data part of the response is extracted.
    const { data } = await axios.get(`${BASE_URL}/${resource}`, config);

    return data;


};