<template>
    <div class="container">
        <h3 class="display-2">Menu Items</h3>

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

        <div class="container" v-if="idVisible === 3 || idVisible === 1">

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
                        <v-date-picker v-model="startDate" @change="populateTable" @input="menu2 = false"></v-date-picker>
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
                        <v-date-picker v-model="endDate" @change="populateTable" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </div>
            </div>
            
            <GetMenuItems 
                v-if="idVisible === 1"
                v-bind:menu-items="menuItems"
                v-bind:start-date="startDate"
                v-bind:end-date="endDate"
                v-bind:load="load">
            </GetMenuItems>

            <UpdateMenuItems 
                v-if="idVisible === 3"
                @display="populateTable"
                v-bind:menu-items="menuItems"
                v-bind:start-date="startDate"
                v-bind:end-date="endDate"
                v-bind:load="load">
            </UpdateMenuItems>

        </div>

        <AddMenuItems v-if="idVisible === 2"></AddMenuItems>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import GetMenuItems from './menu-item-actions/GetMenuItems'
import AddMenuItems from './menu-item-actions/AddMenuItems'
import UpdateMenuItems from './menu-item-actions/UpdateMenuItem'


export default {
    name:'dashboard',
    components:{
        GetMenuItems,
        AddMenuItems,
        UpdateMenuItems
    },
    data(){
        return{
            idVisible:1,
            startDate:new Date().toISOString().substr(0,10),
            endDate:new Date().toISOString().substr(0,10),
            menuItems:[],
            load:false,
            menu2:false,
            menu1:false,
            items:[
                {
                    text:'All Items',
                    id: 1
                },
                {
                    text:'Add Item',
                    id: 2
                },
                { 
                    text: 'Update/Delete Item',
                    id: 3
                }
            ]
        }
    },
    created: function(){
        this.populateTable()
    },
    methods:{
        change: function(item){
            this.idVisible = item;
        },

        ...mapActions('menu', ['getItems']),

        async populateTable(){
            this.menuItems = [];
            var startDate = this.startDate;
            var endDate = this.endDate;
            
            setTimeout(
                this.load = true,
                await this.getItems({startDate,endDate})
                ,10000)

            var isDataFlag = this.$store.state.menu.isDataPresent;

            if(isDataFlag){
                var newItems = this.$store.state.menu.menuItems;    

                for(var items of newItems){
                    if(!this.menuItems.find(x=>x.id == items.id)){
                        this.menuItems.push(items);
                    }
                }
            }
            this.load=false;
        }
    }
}
</script>

