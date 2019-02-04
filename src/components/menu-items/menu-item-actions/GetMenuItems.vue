<template>
    <div class="container">
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
                        label="Picker without buttons"
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
                        label="Picker without buttons"
                        prepend-icon="event"
                        readonly>
                    </v-text-field>
                    <v-date-picker v-model="endDate" @change="populateTable" @input="menu1 = false"></v-date-picker>
                </v-menu>
            </div>
        </div>
        <v-data-table
                :headers="headers"
                :items="menuItems"
                :loading="load"
                class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{props.item.id}}</td>
                <td>{{props.item.name}}</td>
                <td>{{props.item.meal}}</td>
                <td>{{props.item.portionQuantity}}</td>
                <td>{{props.item.portionUnit}}</td>
                <td>{{props.item.portionsProduced}}</td>
                <td>{{props.item.portionCost}}</td>
                <td>{{props.item.station}}</td>
            </template>    
        </v-data-table>
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    name:'getallitems',
    data(){
        return{
            startDate:new Date().toISOString().substr(0, 10),
            menu2:false,
            menu1:false,
            load:false,
            endDate:new Date().toISOString().substr(0, 10),
            headers:[{
                text: 'Id',
                align: 'left',
                sortable: false,
                value: 'id'
                },
                { text: 'Name', value: 'name' },
                { text: 'Meal', value: 'meal' },
                { text: 'Quanitity', value: 'portionQuantity' },
                { text: 'Unit', value: 'portionUnit' },
                { text: 'Produced', value: 'portionsProduced'},
                { text: 'Cost', value: 'portionCost' },
                { text: 'Station', value: 'station' 
            }],
            menuItems:[]
        }
    },
    created: async function(){
        this.populateTable();
    },
    methods: {
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

