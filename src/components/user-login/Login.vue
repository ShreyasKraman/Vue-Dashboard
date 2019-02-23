<template>
  <div class="container-fluid mt-5">
     <div clas="row"> 
       <div class="col-md-5 mx-auto">
        <v-card> 
          <v-card-title primary-title>
            <h3 class="headline mb-0 center">Login</h3>
          </v-card-title> 
          <v-card-text>
            <form @submit.prevent="onSubmit">
              <v-text-field
                v-model="form.username"
                :rules="rulesRequired"
                label="Username"
                id="username"
                name="username"
                outline>
              </v-text-field>
              <v-text-field
                :append-icon="show ? 'visibility_off' : 'visibility'"
                v-model="form.password"
                :type="show ? 'text' : 'password'"
                :rules="rulesRequired"
                label="Password"
                name="password"
                id="password"
                @click:append="show = !show"
                outline>
              </v-text-field>
              <v-card-actions>
                <v-btn color="info" class="btn-block" type="submit" @click="onSubmit()">Login</v-btn>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
       </div>
     </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { mapActions } from 'vuex';


export default {
  name: 'login',
  data(){
    return {
      form:{
        username:'',
        password:''
      },
      show:false,
      password:'Password',
      rules:{
        required: value => !!value || 'Required.',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
      }
    }
  },
  computed:{
    rulesRequired(){
      return [this.rules.required]
    }
  },
  methods:{
    ...mapActions('account', ['login']),

    async onSubmit(){
          try{    
              const username = this.form.username;
              const password = this.form.password;
              
              if(username && password){
                await this.login({username,password});
                if(this.$store.state.account.isLoggedIn){
                  this.$router.push({path:'/menu-items'}); 
                }
                swal("Hey","Just testing","success");
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

