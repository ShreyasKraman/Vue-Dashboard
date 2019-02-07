import {
    MANAGE_FOOD_LOGS,
    MANAGE_DATA_FLAG,
    MANAGE_DELETE_FLAG,
    MANAGE_UPDATE_FLAG
} from '../mutationTypes'

import { foodlogservice } from '../../services/resources/foodlogs-service'
import { alertservice } from '../../services/resources/alert-service'

export const logs = {
    namespaced: true,
    state: {
        foodLogs: [],
        isDataPresent: false,
        isUpdateSuccess: false,
        isDeleteSuccess:false
    },
    mutations: {
        [MANAGE_FOOD_LOGS](state,logs){
            state.foodLogs = logs;
        },
        [ MANAGE_DATA_FLAG ](state,value){
            state.isDataPresent = value
        },
        [ MANAGE_UPDATE_FLAG ](state,value){
            state.isUpdateSuccess = value
        },
        [ MANAGE_DELETE_FLAG ](state,value){
            state.isDeleteSuccess = value
        }
    },
    getters: {
        filterLogs: state => (location) => {
            return state.foodLogs.filter(log => log.station.toLowerCase().includes(location.toLowerCase()))
        }
    },
    actions: {
        async getfoodlogs({commit,rootState},{startDate,endDate}){
            var roles = rootState.account.roles;

            try{

                var response = await foodlogservice.getLogs(startDate,endDate,roles);

                if(response.success){
                    if(response.isDataPresent){
                        commit(MANAGE_DATA_FLAG,true);
                        var foodLogs = response.body;
                        commit(MANAGE_FOOD_LOGS,foodLogs);
                    }else{
                        commit(MANAGE_DATA_FLAG,false);
                    }
                }else{
                    if(response.error){
                        commit(MANAGE_DATA_FLAG,false);
                        alertservice.error(response.error.status,response.error.message)
                    }
                }
                    
            }catch(error){
                console.log(error);
            }
        },
        async addFoodLogs({rootState},{foodLog}){

            var roles = rootState.account.roles;
            
            try{

                var response = await foodlogservice.addLogs(foodLog,roles);

                if(response.success){
                    alertservice.success("Added food log successfully");
                }else{
                    if(response.error){
                        alertservice.error(response.error.status,response.error.body);
                    }else{
                        alertservice.genericError();
                    }
                }

            }catch(error){
                console.log(error);
            }
        },
        async deleteFoodLog({commit},{logId}){
            try{

                var response = await foodlogservice.deleteLog(logId);

                if(response.success){
                    commit(MANAGE_DELETE_FLAG,true);
                    alertservice.success("Food Log deleted successfully");
                }else{
                    commit(MANAGE_DELETE_FLAG,false);
                    if(response.error){
                        alertservice.error(response.error.status,response.error);
                    }else{
                        alertservice.genericError();
                    }

                }

            }catch(error){
                console.log(error);
            }
        }
    }


}