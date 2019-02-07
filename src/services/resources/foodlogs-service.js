import {webApi} from './web-api-service'
import {helperfunction} from './helper-functions';

async function getLogs(startDate,endDate,roles){

    var locationId = helperfunction.getLocationId(roles);

    var params = {
        locationId: locationId,
        startDate: startDate,
        endDate: endDate
    };

    try{
        var response = await webApi.apiGet('/foodLogs/getLocationFoodLogs',params);

        if(response.success){

            if(response.bodyText !== ''){
                var body = JSON.parse(response.bodyText);
                return {
                    success:true,
                    isDataPresent:true,
                    body: body
                }
            }else{
                return {
                    success:true,
                    isDataPresent:false
                }
            }
        }else{
            return {
                success:false,
                error:response.error
            }
        }

    }catch(error){
        console.log(error)
    }

}

async function addLogs(foodLogs, roles){

    var locaitonId = helperfunction.getLocationId(roles);

    foodLogs.locationId = locaitonId;

    try{

        var response = await webApi.apiPost('/foodLogs/addFoodLog',foodLogs);
        if(response.success){
            return{
                success:true
            }
        }else{
            return{
                success:false,
                error:response.error
            }
        }

    }catch(error){
        console.log(error);
    }

} 

async function deleteLog(logId){

    try{
        var response = await webApi.apiDelete('/foodLogs/deleteFoodLog',logId);

        if(response.success){
            return {
                success: true
            }
        }else{
            if(response.error){
                return {
                    success: false,
                    error: response.error
                }
            }
        }

    }catch(error){  
        console.log(error);
    }

}

export const foodlogservice = {
    getLogs,
    addLogs,
    deleteLog
}