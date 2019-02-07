import {webApi} from './web-api-service';
import {helperfunction} from './helper-functions';

async function getItems(startDate, endDate, roles) {

    var locationId = helperfunction.getLocationId(roles);
    var params = {
        locationId: locationId,
        startDate: startDate,
        endDate: endDate
    };

    try {
        var response = await webApi.apiGet('/menuItems/getLocationMenu', params);

        

        if (response.success) {
            if (response.bodyText != '') {
                var body = JSON.parse(response.bodyText);
                return {
                    success: true,
                    isDataPresent: true,
                    menuItems: body
                }
            }else{
                return{
                    success:true,
                    isDataPresent:false
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addItem(item,roles){
    var locationId = helperfunction.getLocationId(roles);

    item.locationId = locationId;

    try{
        var response = await webApi.apiPost('/menuItems/addMenuItem',item);

        if(response.success){
            return {
                success : true
            }
        }else{
            return {
                success : false,
                error : response.error
            }
        }

    }catch(errors){
        console.log(errors);
    }

}

async function updateItem(item){

    const objToUpdate = {
        menuItem: {
            id: item.id,
            meal: item.meal,
            date: item.date,
            locationId: item.locationId,
            name: item.name,
            station: item.station,
            clientId: item.clientId,
            portionCost: Number(item.portionCost),
            portionQuantity: Number(item.portionQuantity),
            portionsProduced: Number(item.portionsProduced),
            portionUnit: item.portionUnit
        },
    };

    try{
        var response = await webApi.apiPut('/menuItems/updateMenuItem',objToUpdate);

        if(response.success){
            return {
                success : true
            }
        }else{
            return {
                success : false,
                error : response.error
            }
        }

    }catch(error){
        console.log(error);
    }

}

async function deleteItem(itemId){
    
    try{
        var response = await webApi.apiDelete('/menuItems/deleteMenuItem',itemId);

        if(response.success){
            return {
                success : true
            }
        }else{
            return {
                success : false,
                error : response.error
            }
        }

    }catch(error){
        console.log(error);
    }

}
export const menuservice = {
    getItems,
    addItem,
    updateItem,
    deleteItem  
}