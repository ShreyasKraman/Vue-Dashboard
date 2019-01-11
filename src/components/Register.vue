<template>
    <div class="container-fluid mt-5 mb-5">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title text-center">Register</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    class="form-control"
                                    placeholder="Eg: Nick Fury"
                                    v-model="name" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Mobile Number</label>
                                <input 
                                    type="text" 
                                    id="phone" 
                                    class="form-control"
                                    placeholder="Eg: 9876543210"
                                    v-model="mobile" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="form-control"
                                    placeholder="Eg: phood@example.com"
                                    v-model="username" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    class="form-control"
                                    placeholder="Eg: your password"
                                    v-model="password" required>
                            </div>
                            <div class="form-group">
                                <label for="confirm-password">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    class="form-control"
                                    placeholder="Eg: confirm password"
                                    v-model="confirm_password" required>
                            </div>
                            <input type='submit' class="btn btn-primary btn-block" value="Register"> 
                        </form>
                    </div>
                    <div class="card-footer">
                        <p class="text-center text-muted">Already a member? 
                            <router-link to="/">Log In</router-link>
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
    name:'register',
    data(){
        return{
            name:'',
            mobile:'',
            username:'',
            password:'',
            confirm_password:''
        }
    },
    methods:{
         onSubmit(){
            if(this.password === this.confirm_password) {
                //Registering user
                this.$http.post('http://localhost:3000/register',{
                    name:this.name,
                    mobile:this.mobile,
                    email:this.username,
                    password:this.password
                }).then(response =>{
                        //Flag value set from server. Can return a token too!
                        if(response.body.flag){
                        
                        swal("Account created!",
                            "User Id:"+response.body.UserID+" (for reference purpose only)",
                            "success");

                        this.$router.push({path: '/'});
                        }
                    }, error =>{
                        swal("oops",error.body.message,"error"); 
                    });

            } else {
                swal("oops","Password and confirm password should match","error");
            }
        }
    }
}
</script>
