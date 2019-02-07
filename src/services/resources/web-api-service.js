import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import { url } from '../../constants/index';


function getAuthToken(){
    return localStorage.getItem('Authorization');
}

async function apiPost(endpoint, body){
    const apiURL = url + endpoint;
    
        const response = await Vue.http.post(apiURL, body, {
                headers: {
                   'authorization': getAuthToken()
                }
        })
        if(response.status === 201 || response.status === 200){
            response.success = true;
            return response;
        }else{
            response.success = false;
            return response;
        }
}

async function apiGet(endpoint, params){
    const apiURL = url + endpoint;

    const response = await Vue.http.get(apiURL,{
            params:params,
            headers:{
                'authorization':getAuthToken()
            }
    });

    if(response.status === 204 || response.status === 200){
        response.success = true;
        return response;
    }else{
        response.success = false;
        return response;
    }
}

async function apiPut(endpoint, body){
    const apiURL = url + endpoint;  

    try{

        const response = await Vue.http.put(apiURL, body, {
            headers: {
                'authorization': getAuthToken(),
                'Content-type':'application/json'
             }
        });

        if(response.status === 200){
            response.success = true;
            return response;
        }else{
            response.success = false;
            response.error = response.body;
            return response;
        }

    }catch(error){
        console.log(error);
    }
   
}

async function apiDelete(endpoint,Id){
    const apiURL = url + endpoint;

    try{
        const response = await Vue.http.delete(apiURL, {
            params: { id : Id },
            headers: {
                authorization:getAuthToken()
            }
        });

        if(response.status === 200){
            response.success = true;
            return response;
        }else{
            response.success = false;
            response.error = response.body;
            return response;
        }

    }catch(error){
        console.log(error);
    }   
}

export const webApi = {
    apiPost,
    apiGet,
    apiPut,
    apiDelete
}
