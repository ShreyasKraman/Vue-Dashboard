<template>
  <div class="container-fluid mt-5">
     <div clas="row"> 
       <div class="col-md-6 mx-auto">
        <div class="card"> 
          <div class="card-header">
            <h2 class="text-center card-title">Login</h2>
          </div> 
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="emailAddress">Email Address</label>
                <input 
                  type="email" 
                  id="emailAddress" 
                  class="form-control" 
                  placeholder="Enter Email"
                  v-model="username">
              </div>
              <div class="form-group">
                <label for="passwordEnter">Email Address</label>
                <input 
                  type="password" 
                  id="passwordEnter" 
                  class="form-control" 
                  placeholder="Enter Password"
                  v-model="password">
              </div>
              <button type="submit" name="login" class="btn btn-primary btn-block">Login</button>
            </form>
          </div>
          <div class="card-footer">
            <p class="text-muted text-center ">Not a member yet? 
              <router-link :to="{path: '/register'}">Register here</router-link>
            </p>
          </div>
        </div>
       </div>
     </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:''
    }
  },
  created:{
    
  },
  computed:{
    getAuthState(){
      return this.$store.state.isLoggedIn;
    }
  },
  methods:{
    async onSubmit(){
      if(this.username != "" && this.password != "") {
          try{    
              var params = { username: this.username,password: this.password};
              var headers = { 'content-type': 'application/json' };
              var response = await this.$http.get('http://localhost:3000/login',{params,headers});
              var result = await response.json();
              if(result.flag){
                this.$store.commit('changeState',true);
                this.$router.push({path: '/dashboard'});
              }
          }catch(err){
            swal("oops",err.body.message,"error"); 
          }


      } else {
          swal("oops","Both username and password are mandatory","error");
      }
    }
  }
}
</script>
