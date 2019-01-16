<template>
    <div class="container">
        <h2 name="dashboard-header" class="text-center">Dashboard</h2>
    </div>
</template>

<script>
export default {
    name:'dashboard',
    data(){
        return{
            roles: this.$store.state.roles
        }
    },
    beforeCreate: function(){
        if(!this.$session.exists()){
            this.$store.commit('changeState',false);
            this.$router.push({path:'/'});
        }
    },
    methods:{
        getMenuItems(){

            

        }
    }
}
</script>

