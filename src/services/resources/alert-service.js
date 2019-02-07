import swal from 'sweetalert';

function success(message){
    swal("Success",message,"success");
}

function info(message){
    swal("Information",message,'info')
}

function error(error,message){
    swal(error,message,"error");
}

function genericError(){
    swal("Falied","Uh oh! Either the username or password is incorrect, or there is an error on our end. Please contact us if you need assistance.","error");
}

export const alertservice = {
    success,
    error,
    info,
    genericError
}