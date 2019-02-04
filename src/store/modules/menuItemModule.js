import { 
    MANAGE_MENUITEMS,
    MANAGE_DATA_FLAG,
    MANAGE_UPDATE_FLAG,
    MANAGE_DELETE_FLAG
 } from '../mutationTypes';

import { menuservice } from '../../services/resources/menuItem-service';
import { alertservice } from '../../services/resources/alert-service';

export const menu = {
    namespaced: true,
    state: {
        menuItems: [],
        isDataPresent: false,
        isUpdatedSuccess:false,
        isDeletedSuccess:false,
    },
    mutations: {
        [MANAGE_MENUITEMS](state, menuitem) {
            state.menuItems = menuitem;
        },
        [MANAGE_DATA_FLAG](state, value) {
            state.isDataPresent = value;
        },
        [MANAGE_UPDATE_FLAG](state, value) {
            state.isUpdatedSuccess = value;
        },
        [MANAGE_DELETE_FLAG](state, value) {
            state.isDeletedSuccess = value;
        }
    },
    actions: {
        async getItems({commit,rootState}, {startDate,endDate}) {
            var roles = rootState.account.roles;
            try{
                var response = await menuservice.getItems(startDate,endDate,roles);

                if (response.success) {
                    if (response.isDataPresent) {
                        var menuItems = response.menuItems;
                        commit(MANAGE_MENUITEMS,menuItems);
                        commit(MANAGE_DATA_FLAG, true);
                    } else {
                        commit(MANAGE_DATA_FLAG, false);
                    }
                }
            }catch(error){
                console.log(error);
            }   

        },

        async addItem({rootState}, {item}){
            var roles = rootState.account.roles;

            try{    

                var response = await menuservice.addItem(item,roles);

                if(response.success){
                    alertservice.success("Added an item to the database");

                }else{
                    if(response.error)
                        console.log(response.error);
                }

            }catch(error){
                console.log(error);
            }

        },

        async updateItem({commit}, {item}){
            try{
                var response = await menuservice.updateItem(item);
                console.log("update reponse",response);
                if(response.success){
                    alertservice.success("Item updated successfully");
                    commit(MANAGE_UPDATE_FLAG,true);
                }else{
                    if(response.error){
                        console.log(response.error);
                        commit(MANAGE_UPDATE_FLAG,false);
                    }
                }
            }catch(error){
                console.log(error);
                commit(MANAGE_UPDATE_FLAG,false);
            }
        },

        async deleteItem({commit},{itemId}){
            try{

                var response = await menuservice.deleteItem(itemId);

                if(response.success){
                    alertservice.success("Item deleted successfully");
                    commit(MANAGE_DELETE_FLAG,true);
                }else{
                    if(response.error){
                        console.log(response.error);
                        commit(MANAGE_DELETE_FLAG,false);
                    }
                }

            }catch(error){
                console.log(error);
            }
        }

        

    },
    getters: {

    }
}