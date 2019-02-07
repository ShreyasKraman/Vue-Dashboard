<template>
    <div class="container">
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

export default {
    name:'getallitems',
    props:['startDate','endDate','menuItems','load'],
    data(){
        return{
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
            }]
        }
    },
    methods: {

    }
}
</script>

