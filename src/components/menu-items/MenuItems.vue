<template>
    <div class="container">
        <md-table v-model="menuItems" md-card>
            <md-table-toolbar>
                <h2 class="md-title">Menu Items</h2>
            </md-table-toolbar>

            <md-table-row slot="md-table-row">
                <md-table-head>Name</md-table-head>
                <md-table-head>Meal</md-table-head>
                <md-table-head>Proportion Qunatity</md-table-head>
                <md-table-head>Proportion Unit</md-table-head>
                <md-table-head>Proportions Produced</md-table-head>
                <md-table-head>Portion Cost</md-table-head>
                <md-table-head>Station</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" slot-scope="items">
                <md-table-cell md-label="Name" md-sort-by="name">{{items.name}}</md-table-cell>
                <md-table-cell md-label="Meal" md-sort-by="meal">{{items.meal}}</md-table-cell>
                <md-table-cell md-label="ProportionQuantity" md-sort-by="proportionQuantity">{{items.proportionQuantity}}</md-table-cell>
                <md-table-cell md-label="proportionUnit" md-sort-by="proportionUnit">{{items.proportionUnit}}</md-table-cell>
                <md-table-cell md-label="proportionsProducted" md-sort-by="proportionsProducted">{{items.proportionsProducted}}</md-table-cell>
                <md-table-cell md-label="portionCost" md-sort-by="portionCost">{{items.portionCost}}</md-table-cell>
                <md-table-cell md-label="station" md-sort-by="station">{{items.station}}</md-table-cell>
            </md-table-row>    
        </md-table>
    </div>
</template>

<script>

import swal from 'sweetalert';
import { url } from '../../constants/index.js';

export default {
    name:'dashboard',
    data(){
        return{
            startDate:'',
            endDate:'',
            menuItems:[
                {
                    id:'',
                    name:'',
                    clientId:'',
                    meal:'',
                    portionQuantity:'',
                    portionUnit:'',
                    portionsProduced:'',
                    portionCost:'',
                    locationId:'',
                    station:''
                }
            ]
        }
    },
    beforeCreate: function(){
        if(!this.$store.state.account.isLoggedIn){
            this.$router.push({path:''});
        }   
    },
    methods:{
        async getMenuItems(){
            var resource = url+'/menuItems/getLocationMenu';
            var roles = this.$store.state.roles;
            var locationID = '';
            var clientID = '';
            for(let role of roles){
                if(role.roleName === 'ManageLocation' && role.entityType === 'Location'){
                    locationID = role.locationEntityId;
                    break;
                }
            }
            this.startDate = '2017/01/01';
            this.endDate = '2019/01/10';

            if(locationID){
                
                try{
                    var params = { 
                        locationId : locationID, 
                        startDate: this.startDate, 
                        endDate: this.endDate
                    }; 

                    var body = {
                        locationId: locationID,
                        name: 'Burger',
                        clientId: 'NEU11002',
                        meal: 'Lunch',
                        date: '2019/01/01',
                        portionQuantity: 10,
                        portionUnit: 'oz',
                        portionsProduced: 75,
                        portionCost: 10,
                        station: 'kitchen'
                    }

                    // var auth = this.$session.get('Authorization');
                    var auth = localStorage.getItem('Authorization');
                    var headers = {
                        'content-type':'application/json',
                        'Authorization':auth
                    }
                    
                    var response = await this.$http.get(resource,{params:params,headers:headers});
                    
                    // var response = await this.$http.post(
                    //     'https://api.test.phoodsolutions.com/menuItems/addMenuItem',
                    //     body,
                    //     {headers}
                    // )
                    
                    // var response = await this.$http.delete(
                    //     'https://api.test.phoodsolutions.com/menuItems/deleteMenuItem',
                    //     {params:{id:25}, headers:headers})

                    // if(response.status == 204){
                    //     swal("Oops",response.statusText,"info");
                    // }else if(response.status == 200){
                    //     var body = JSON.parse(response.body);
                    //     for(items of body){
                    //         this.menuItems.push(items);
                    //     }
                    // }

                    // var result = await response.json();

                    console.log(response);
                }catch(err){
                    // var errorText = JSON.parse(err.bodyText);
                    // swal(err.statusText,errorText.error,"error");

                    console.log(err);
                }
            }

        }
    }
}
</script>

