<template>
    <div class="container">
        <h3 class="display-2">Food Logs</h3>

        <div class="row">
            <div class="col-md-6">
                <v-select
                    :items="items"
                    label="Choose Action"
                    item-value="id"
                    item-text="text"
                    @change='change'>
                </v-select>
            </div>
        </div>

        <div class="container" v-if="idVisible === 1 || idVisible === 3">
            <div class="row">
                <div class="col-md-3">
                    <v-menu
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                        <v-text-field
                            slot="activator"
                            v-model="startDate"
                            label="Start Date"
                            prepend-icon="event"
                            readonly>
                        </v-text-field>
                        <v-date-picker v-model="startDate" @change="dateChange" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                </div>

                <div class="col-md-3">    
                    <v-menu
                        :close-on-content-click="false"
                        v-model="menu1"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                        <v-text-field
                            slot="activator"
                            v-model="endDate"
                            label="End Date"
                            prepend-icon="event"
                            readonly>
                        </v-text-field>
                        <v-date-picker v-model="endDate" @change="dateChange" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </div>

                <div class="col-md-3">
                    <v-text-field
                        solo
                        label="Filter Location"
                        prepend-inner-icon="search"
                        v-model="location"
                        @change="filter"
                    ></v-text-field>
                </div>
            </div>

            <GetFoodLogs
                 v-if="idVisible === 1"
                 @display="populateTable"
                 v-bind:start-date="startDate"
                 v-bind:end-date="endDate"
                 v-bind:load="load"
                 v-bind:foodlogs="filter">
            </GetFoodLogs>
            
            <DeleteFoodLogs v-if="idVisible === 3"></DeleteFoodLogs>

        </div>

        <AddFoodLogs v-if="idVisible === 2"></AddFoodLogs>

    </div>
</template>

<script>
import { mapActions } from 'vuex'

import GetFoodLogs from './food-logs-actions/GetFoodLogs'
import AddFoodLogs from './food-logs-actions/AddFoodLogs'

export default {
    name:'dashboard',
    components:{
        GetFoodLogs,
        AddFoodLogs
    },
    data(){
        return{
            idVisible:1,
            items:[
                {
                    text:'Food Logs',
                    id: 1
                },
                {
                    text:'Add Food Log',
                    id: 2
                }
            ],
            location:'',
            startDate:new Date().toISOString().substr(0, 10),
            menu2:false,
            menu1:false,
            endDate:new Date().toISOString().substr(0, 10),
            foodlogs:[],
            load:false,
        }
    },
    created:async function(){
        this.populateTable();
    },
    computed:{
        filter(){
            return this.foodlogs.filter(log => {
                return log.itemName.toLowerCase().includes(this.location.toLowerCase())
            })
        }
    },
    methods:{
        change: function(item){
            this.idVisible = item;
        },

        ...mapActions('logs', ['getfoodlogs']),

        dateChange(){
            this.populateTable();
        },

        async populateTable(){

            this.foodlogs = [];
            var startDate = this.startDate;
            var endDate = this.endDate;
            
            setTimeout(
                this.load = true,
                await this.getfoodlogs({startDate,endDate})
                ,10000)

            var isDataFlag = this.$store.state.logs.isDataPresent;

            if(isDataFlag){
                var newItems = this.$store.state.logs.foodLogs;    

                for(var items of newItems){
                    if(!this.foodlogs.find(x=>x.id == items.id)){
                        this.foodlogs.push(items);
                    }
                }
            }
            this.load=false;
        }
    }
}
</script>

