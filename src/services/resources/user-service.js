import {
    webApi
} from './web-api-service';

async function login(username, password) {
    const params = {
        username: username,
        password: password
    };
    try {
        var response = await webApi.apiPost('/auth/login', params);
        if (response.success) {
            var token = response.headers.map.authorization[0];
            localStorage.setItem('Authorization', token);

            return {
                success: true,
                roles: response.body.roles
            }
        }else{
            return {
                success:false,
                error: response.error
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error.data
        };
    }

}

async function logout() {
    webApi.apiPost('/auth/logout');
}

export const userservice = {
    login,
    logout
}