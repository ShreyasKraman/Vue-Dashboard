<template>
    <div class="container">
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

        <GetMenuItems v-if="idVisible === 1"></GetMenuItems>

        <AddMenuItems v-if="idVisible === 2"></AddMenuItems>

        <UpdateMenuItems v-if="idVisible === 3"></UpdateMenuItems>
    </div>
</template>

<script>
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
    methods:{
        change: function(item){
            this.idVisible = item;
        },
    }
}
</script>

