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
    if(this.$session.exists()){
      this.$store.commit('changeState',true);
      this.$router.push({path:'/dashboard'});
    }
  },
  computed:{
    getAuthState(){
      return this.$store.state.isLoggedIn;
    }
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
    async onSubmit(){
      // if(this.username != "" && this.password != "") {
          try{    
              var params = { username: this.form.username,password: this.form.password};
              // var header s = { 'content-type': 'application/json' };
              var response = await this.$http.post('https://api.test.phoodsolutions.com/auth/login',params);
              var result = await response.json();
              console.log(result);
              
              if(response.status === 200 && 'authorization' in response.headers.map){
                //Auth token  
                var token = response.headers.map.authorization[0];
                //start session
                this.$session.start();
                this.$session.set('token',token);
                this.$http.headers.common['Authorization'] = 'Basic ' + token;
                this.$store.commit('addRoles',response.body.roles);
                this.$store.commit('changeState',true);
                this.$router.push({path:'/dashboard'});
              }
          }catch(err){
            if(err.status == 401){
              swal("Unauthorized","Username or Password is incorrect","error"); 
            }else{
              swal("oops","Please try again later","error");
            }
          }
    }
  }
}
</script>

