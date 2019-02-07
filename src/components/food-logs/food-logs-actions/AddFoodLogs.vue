<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <h2 class="text-center">Add Food Log</h2>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <v-text-field v-model="log.itemName" :rules="[rules.required]" label="Item Name"></v-text-field>
                                    <v-menu
                                        :close-on-content-click="false"
                                        v-model="menu"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px">
                                        <v-text-field
                                            slot="activator"
                                            v-model="log.dateProduced"
                                            label="Date produced"
                                            prepend-icon="event"
                                            readonly>
                                        </v-text-field>
                                        <v-date-picker v-model="log.dateProduced" @input="menu = false"></v-date-picker>
                                    </v-menu>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <v-text-field 
                                            v-model="log.meal" 
                                            :rules="[rules.required]" 
                                            label="Meal">
                                        </v-text-field>
                                    </div>
                                    <div class="col-md-6">
                                        <v-select
                                            :items="units"
                                            v-model="log.unit" 
                                            label="Unit">
                                        </v-select>
                                    </div>
                                </div>
                                    <v-text-field  
                                        v-model="log.actionTaken" 
                                        :rules="[rules.required]" 
                                        label="Action taken">
                                    </v-text-field>

                                </div>
                                <div class="col-md-6">
                                    <v-text-field 
                                        v-model="log.itemType" 
                                        :rules="[rules.required]" 
                                        label="Item Type">
                                    </v-text-field>

                                    <v-text-field 
                                        type="number" 
                                        v-model="log.quantity" 
                                        :rules="[rules.required,rules.numeric,rules.minValue]" 
                                        label="Quantity">
                                    </v-text-field>

                                    
                                    <v-text-field  
                                        v-model="log.station" 
                                        :rules="[rules.required]" 
                                        label="Station">
                                    </v-text-field>
                                    

                                    <v-text-field 
                                        v-model="log.actionReason" 
                                        :rules="[rules.required]"
                                        label="Action Reason">
                                    </v-text-field>
                                    
                                </div>
                            </div>
                            <v-text-field
                                v-model="log.employeeName"
                                :rules="[rules.required]"
                                label="Employee Name">
                            </v-text-field>    
                        </form>
                        <v-btn color="info" type="submit" class="btn-block" @click="add">Add Item</v-btn>
                    </div>
                    <div class="card-footer text-muted text-center">
                        <!-- {{currentDateTime}} -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment'
import { mapActions } from 'vuex'

export default {
    name:'addfoodlogs',
    data(){
        return{
            menu:false,
            units:['lbs','kg','oz','gm'],
            log:{
                itemName:'',
                itemType:'',
                dateProduced:new Date().toISOString().substr(0, 10),
                actionTaken:'',
                actionReason:'',
                meal:'',
                quantity:0,
                unit:'',
                station:'',
                employeeName:''
            },
            currentDateTime:'',
            rules:{
                required: value => !!value || 'Required',
                numeric: value => !!(!isNaN(value)) || 'Numeric value only',
                minValue: value => !!(value > 0) || 'Value must be greater than 0' 
            }
        }
    },
    methods:{
        ...mapActions('logs',['addFoodLogs']),

        async add(){

            this.log.loggedTime = moment().format().substr(0,19);
            var foodLog = this.log;
            await this.addFoodLogs({foodLog});

        }//,
        // async time(){
        //     this.currentDateTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
        //     setInterval(this.time, 1000)
        // }
    },
    mounted:function(){
        // this.time();
    }
}
</script>

<style>

</style>
