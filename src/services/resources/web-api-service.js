import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import { url } from '../../constants/index';


function getAuthToken(){
    return localStorage.getItem('Authorization');
}

function handleResponse(httpResponse) {
    /*
    HttpResponse contains the following properties:
        success, status, statusText, data, config(the request object), and headers(method for retrieving header data).
     */

        // Handle special cases
    if (httpResponse.status === 304) {
        httpResponse.success = true;
    } else if (httpResponse.status === 401) {
        // Log out user.
            
    }
    return httpResponse;
}

async function apiPost(endpoint, body){
    const apiURL = url + endpoint;
    
        const response = await Vue.http.post(apiURL, body, {
                headers: {
                   'authorization': getAuthToken()
                }
        })

        if(response.status === 200){
            response.success = true;
            return response;
        }else{
            response.success = false;
            return response;
        }

    //return handleResponse(response);
}

async function apiGet(endpoint, params, http){
    const apiURL = url + endpoint;

    const response = await new Promise((resolve, reject) => {
        http.get(apiURL, {
            params: params,
            headers: {
                'authorization': getAuthToken(),
            }
        })
            .then((response) => {
                response.success = true;
                return resolve(response);
            })
            .catch((response) => {
                response.success = false;
                return resolve(response);
            });
    });

    return handleResponse(response);
}

async function apiPut(endpoint, body, http){
    const apiURL = url + endpoint;

    const response = await new Promise(function(resolve, reject) {
        http.put(apiURL, body, {headers: {authorization: getAuthToken()} })
            .then((response) => {
                response.success = true;
                return resolve(response);
            })
            .catch((response) => {
                response.success = false;
                return resolve(response);
            });
    });

    return handleResponse(response);    
}

async function apiDelete(endpoint,query,http){
    const apiURL = url + endpoint;

    const response = await new Promise((resolve, reject) => {
        http.delete(apiURL, {
            params: query,
            headers: {'authorization': getAuthToken()}
        })
            .then((response) => {
                response.success = true;
                return resolve(response);
            })
            .catch((response) => {
                response.success = false;
                return resolve(response);
            });
    });

    return handleResponse(response);    
}

export const webApi = {
    apiPost,
    apiGet,
    apiPut,
    apiDelete
}
