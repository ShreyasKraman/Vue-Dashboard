import {
    userservice
} from '../../services/resources/user-service';
import {
    alertservice
} from '../../services/resources/alert-service';

import {
    MANAGE_LOGIN,
    MANAGE_ROLES
} from '../mutationTypes';

export const account = {
    namespaced: true,
    state: {
        isLoggedIn: false,
        token: '',
        roles: {}
    },
    mutations: {
        [MANAGE_LOGIN](state, value) {
            state.isLoggedIn = value;
        },
        [MANAGE_ROLES](state, role) {
            state.roles = role;
        }
    },
    actions: {

        async login({commit}, {username,password}){

            await userservice.login(username, password)
                .then(response => {
                    if (response.success) {
                        //this.$store.commit('addRoles',result.roles);
                        // dispatch('loginstate',true);
                        commit(MANAGE_ROLES, response.roles);
                        commit(MANAGE_LOGIN, true);
                    } else {
                        if (response.error === 'Unauthorized') {
                            alertservice.error(response.error, "Invalid username or password");
                        } else {
                            alertservice.genericError();
                            console.log(response);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                    alertservice.genericError();
                });
        },

        async logout({
            commit
        }, {
            router
        }) {
            userservice.logout();
            // dispatch('loginstate',false);
            commit(MANAGE_LOGIN, false);
            localStorage.removeItem('Authorization');
            router.push({
                path: '/'
            });
        },

        loginstate({
            commit
        }, {
            value
        }) {
            commit(MANAGE_LOGIN, value);
        }

    }

}