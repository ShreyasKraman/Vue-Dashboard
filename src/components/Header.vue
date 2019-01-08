<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" class="navbar-brand">Phood</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav mr-auto">
			<li class="nav-item active">
                <a class="nav-link">Home <span class="sr-only">(current)</span></a>
            </li>
			<li class="nav-item"><a class="nav-link">How it Works</a></li>
			<li class="nav-item"><a class="nav-link">About Us</a></li>
		</ul>
        <span class="navbar-item" v-if="authenticated"><a class="nav-link" @click="logout()">Logout</a></span>
    </nav>   
</template>

<script>
export default {
    name: 'Header',
    computed:{
        authenticated(){
            return this.$store.state.isLoggedIn;
        }
    },
    methods:{
        logout(){
            this.$store.commit('changeState',false);
        }
    }
}

</script>

<style>

</style>
