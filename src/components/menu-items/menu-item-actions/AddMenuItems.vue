<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <h2 class="text-center">Add Item</h2>
                    </div>
                    <div class="card-body">
                        <form>
                        <div class="row">
                                <div class="col-md-6">
                                    <v-text-field v-model="items.name" :rules="[rules.required]" label="Name"></v-text-field>
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
                                            v-model="items.date"
                                            label="Date"
                                            prepend-icon="event"
                                            readonly>
                                        </v-text-field>
                                        <v-date-picker v-model="items.date" @input="menu = false"></v-date-picker>
                                    </v-menu>
                                    <v-text-field 
                                        type="number" 
                                        v-model="items.portionQuantity" 
                                        :rules="[rules.required,rules.numeric,rules.minValue]" 
                                        label="Quantity">
                                    </v-text-field>
                                    <v-text-field 
                                        type="number" 
                                        v-model="items.portionsProduced" 
                                        :rules="[rules.required,rules.numeric,rules.minValue]" 
                                        label="Items Produced">
                                    </v-text-field>
                                    <v-text-field  
                                        v-model="items.station" 
                                        :rules="[rules.required]" 
                                        label="Station">
                                    </v-text-field>
                                </div>
                                <div class="col-md-6">
                                    <v-text-field v-model="items.clientId" label="Client Id"></v-text-field>
                                    <v-text-field v-model="items.meal" label="Meal"></v-text-field>
                                    <v-select
                                        :items="units"
                                        v-model="items.portionUnit" 
                                        label="Unit">
                                    </v-select>
                                    <v-text-field 
                                        type="number" 
                                        v-model="items.portionCost"
                                        :rules="[rules.required,rules.numeric,rules.minValue]"  
                                        label="Cost">
                                    </v-text-field>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <v-btn color="info" type="submit" class="btn-block" @click="add">Add Item</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    name: 'addmenuitems',
    data(){
        return{
            menu:false,
            units:['lbs','kg','oz','gm'],
            items:{
                name:'',
                clientId:'',
                date:new Date().toISOString().substr(0, 10),
                portionQuantity:0,
                meal:'',
                portionsProduced:0,
                portionUnit:'',
                station:'',
                portionCost:0
            },
            rules:{
                required: value => !!value || 'Required',
                numeric: value => !!( !isNaN(value)) || 'Numeric value only',
                minValue: value => !!(value > 0) || 'Value must be greater than 0' 
            }
        }
    },
    methods:{
        ...mapActions('menu',['addItem']),

        add(){
            const item = this.items;
            this.addItem({item});
        },


    }


}
</script>

<style>

</style>
