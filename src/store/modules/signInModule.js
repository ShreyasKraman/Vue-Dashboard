import { userservice } from '../../services/resources/user-login'; 

import { CHANGE_LOGGEDIN } from '../mutationTypes';
import { MANAGE_ROLES } from '../mutationTypes';

export const account = {
    namespaced: true,
    state:{
        isLoggedIn: false,
        roles: {}
    },
    mutations:{
        [ CHANGE_LOGGEDIN ](state, value){
            state.isLoggedIn = value;
        },
        [ MANAGE_ROLES ](state, role){
            state.roles = role;
        }
    },
    actions: {
        async login({dispatch,commit}, {username,password}){
            
            await userservice.login(username,password)
                .then( response => {
                    if(response.success){
                        //this.$store.commit('addRoles',result.roles);
                        commit(CHANGE_LOGGEDIN,true);
                    }
                })
                .catch( error => {
                    console.log(error);
                });
        },
        async logout({commit},{router}){
            userservice.logout();
            commit(CHANGE_LOGGEDIN,false);
            localStorage.removeItem('Authorization');
            router.push({path:'/'});
        },
        dispatchErros(){
            
        }

    }

}