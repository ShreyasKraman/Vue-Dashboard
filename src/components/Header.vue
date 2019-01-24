<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" class="navbar-brand"><img src="../assets/logo.png" width="40" height="40"><img src="../assets/Phood_Logo.png" width="150" height="50" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav mr-auto" v-if="authenticated">
			<li class="nav-item active">
                <a class="nav-link">Home <span class="sr-only">(current)</span></a>
            </li>
			<li class="nav-item"><a class="nav-link">How it Works</a></li>
			<li class="nav-item"><a class="nav-link">About Us</a></li>
		</ul>
        <span class="navbar-item" v-if="authenticated">
            <a class="nav-link" @click="signout()">Logout</a>
        </span>
    </nav>   
</template>

<script>

import { mapActions } from 'vuex';

export default {
    name: 'Header',
    computed:{
        authenticated(){
            return this.$store.state.account.isLoggedIn;
        }
    },
    methods:{
        ...mapActions('account', ['logout']),
        signout(){
            this.logout({router:this.$router});
        }
    }
}

</script>

<style>
    a.nav-link{
        cursor: pointer;
    }
</style>
