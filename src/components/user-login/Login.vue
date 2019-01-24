<template>
  <div class="container-fluid mt-5">
     <div clas="row"> 
       <div class="col-md-5 mx-auto">
        <div class="card"> 
          <div class="card-header">
            <h2 class="text-center card-title">Login</h2>
          </div> 
          <div class="card-body">
            <form @submit.prevent="validateInput">
              <md-field :class="getValidationClass('username')">
                <label for="emailAddress">Username</label>
                <md-input 
                  type="text" 
                  id="emailAddress" 
                  v-model="form.username">
                </md-input>
                <span class="md-error" v-if="!$v.form.username.required">Username must not be blank</span>
              </md-field>
              <md-field :class="getValidationClass('password')">
                <label for="passwordEnter">Password</label>
                <md-input 
                  type="password" 
                  id="passwordEnter" 
                  v-model="form.password">
                </md-input>
                <span class="md-error" v-if="!$v.form.password.required">Password must not be blank</span>  
              </md-field>
              <!-- <button type="submit" name="login" class="btn btn-primary btn-block">Login</button> -->
              <md-button class="md-raised md-primary btn-block" type="submit">Login</md-button>
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
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';


export default {
  name: 'login',
  data(){
    return {
      form:{
        username:'',
        password:''
      }
    }
  },
  validations: {
    form:{
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  beforeCreate:function(){
    // if(this.$session.exists()){
    //   this.$store.signIn.commit('change_logged_in',true);
    //   this.$router.push({path:'/dashboard'});
    // }
  },
  methods:{
    getValidationClass(fieldName){
      const field = this.$v.form[fieldName]

      if(field){
        return{
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateInput(){
      this.$v.$touch()
      
      if (!this.$v.$invalid) {
        this.onSubmit()
        this.$v.$reset()
      }
    },
    ...mapActions('account', ['login']), 
    async onSubmit(){
      // if(this.username != "" && this.password != "") {
          try{    
              const username = this.form.username;
              const password = this.form.password;
              // var header s = { 'content-type': 'application/json' };
              if(username && password){
                await this.login({username,password});
                if(this.$store.state.account.isLoggedIn){
                  this.$router.push({path:'/dashboard'}); 
                }
              }
              
          }catch(err){
            if(err.status === 401){
              swal("Unauthorized","Username or Password is incorrect","error"); 
            }else{
              console.log(err);
              swal("oops","Please try again later","error");
            }
          }
    }
  }
}
</script>

