<template>
    <div class="container">
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="items.name" :rules="[rules.required]" label="Name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
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
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field 
                                type="number" 
                                v-model="items.portionQuantity" 
                                :rules="[rules.required,rules.numeric,rules.minValue]" 
                                label="Quantity">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field 
                                type="number" 
                                v-model="items.portionsProduced" 
                                :rules="[rules.required,rules.numeric,rules.minValue]" 
                                label="Items Produced">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field  
                                v-model="items.station" 
                                :rules="[rules.required]" 
                                label="Station">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="items.clientId" label="Client Id"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="items.meal" label="Meal"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>    
                            <v-select
                                :items="units"
                                v-model="items.portionUnit" 
                                label="Unit">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field 
                                type="number" 
                                v-model="items.portionCost"
                                :rules="[rules.required,rules.numeric,rules.minValue]"  
                                label="Cost">
                            </v-text-field>
                        </v-flex>

                    </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>

        <v-data-table
                :headers="headers"
                :items="menuItems"
                class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{props.item.id}}</td>
                <td>{{props.item.name}}</td>
                <td>{{props.item.meal}}</td>
                <td>{{props.item.portionQuantity}}</td>
                <td>{{props.item.portionUnit}}</td>
                <td>{{props.item.portionsProduced}}</td>
                <td>{{props.item.portionCost}}</td>
                <td>{{props.item.station}}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)">
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItems(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>    
        </v-data-table>
    </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    name:'updateItems',
    props:['menuItems','startDate','endDate','load'],
    data(){
        return{
            menu:false,
            dialog:false,
            formTitle:'',
            units:['lbs','kg','oz','gm'],
            rules:{
                required: value => !!value || 'Required',
                numeric: value => !!( !isNaN(value)) || 'Numeric value only',
                minValue: value => !!(value > 0) || 'Value must be greater than 0' 
            },
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
            items:{
                name:'',
                clientId:'',
                date:'',
                portionQuantity:0,
                meal:'',
                portionsProduced:0,
                portionUnit:'',
                station:'',
                portionCost:0
            },
            editedIndex:-1,
        }
    },
    methods: {
        ...mapActions('menu', ['updateItem','deleteItem']),

        editItem (item) {
            this.editedIndex = this.menuItems.indexOf(item)
            this.items = Object.assign({}, item)
            this.formTitle = 'Edit Item'
            this.dialog = true
        },

        async deleteItems (item) {
            var itemId = item.id;
            await this.deleteItem({itemId});

            var deleteFlag = this.$store.state.menu.isDeletedSuccess;

            if(deleteFlag)
                this.$emit('display');
        },

      close () {
        this.dialog = false
        setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async save () {
        if (this.editedIndex > -1) {
            var item = this.items;
            await this.updateItem({item});

            var updateFlag = this.$store.state.menu.isUpdatedSuccess;
            if(updateFlag)
                this.$emit('display');
            
        } else {
          
        }
        this.close()
      }
    }
}
</script>

