<template>
  <div class="container-fluid mt-5">
     <div clas="row">
       <div class="col-md-6 mx-auto">
        <div class="card"> 
          <div class="card-header">
            <h2 class="text-center text-info">Login</h2>
          </div> 
          <form class="card-body" @submit.prevent="onSubmit">
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
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:''
    }
  },
  computed:{
    getAuthState(){
      return this.$store.state.isLoggedIn;
    }
  },
  methods:{
    onSubmit(){
      if(this.username != "" && this.password != "") {
          
          //Authenticating user
          this.$http.post('http://localhost:3000/login',{
              emailId:this.username,
              password:this.password
            }).then(response =>{
                //Flag value set from server. Can return a token too!
                if(response.body.flag){
                  this.$store.commit('changeState',true);
                }
            }, error =>{
                swal("oops",error.body.message,"error"); 
            });

      } else {
          swal("oops","Both username and password are mandatory","error");
      }
    }
  }
}
</script>
