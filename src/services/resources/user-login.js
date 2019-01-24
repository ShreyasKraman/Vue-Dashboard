import { webApi } from './web-api-service';

async function login(username, password){
    const params = { username: username, password: password  };
    var response = await webApi.apiPost('/auth/login',params);
    if(response.success){
        var token = response.headers.map.authorization[0];
        localStorage.setItem('Authorization',token);
        
        return {
            success:true
        }
    }

}

async function logout(){

}

export const userservice = {
    login,
    logout
}
