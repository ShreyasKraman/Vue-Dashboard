<template>

    <v-data-table
            :headers="headers"
            :items="foodlogs"
            :loading="load"
            class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
            <td>{{props.item.id}}</td>
            <td>{{props.item.itemName}}</td>
            <td>{{props.item.meal}}</td>
            <td>{{props.item.quantity}}</td>
            <td>{{props.item.unit}}</td>
            <td>{{props.item.actionTaken}}</td>
            <td>{{props.item.actionReason}}</td>
            <td>{{props.item.employeeName}}</td>
            <td>{{props.item.station}}</td>
            <td class="justify-center layout px-0">
                <v-icon
                    small
                    @click="deleteItem(props.item)">
                    delete
                </v-icon>
            </td>
        </template>    
    </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name:'getfoodlogs',
    props:['startDate','endDate','foodlogs','load'],
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
                { text: 'Quanitity', value: 'quantity' },
                { text: 'Unit', value: 'unit' },
                { text: 'Action Taken', value: 'actionTaken'},
                { text: 'Action Reason', value: 'actionReason' },
                { text: 'Employee', value: 'employee'},
                { text: 'Station', value: 'station' 
            }],
            load:false
        }
    },
    methods:{

        ...mapActions('logs',['deleteFoodLog']),

        async deleteItem(foodLog){
            var logId = foodLog.id;
            await this.deleteFoodLog({logId});

            var deleteFlag = this.$store.state.logs.isDeleteSuccess;
            if(deleteFlag){
                
                this.$emit('display');
            }
        }
    }
}
</script>

