export const dataValidator = (data, type) => {

    if(type=="email"){
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(data)){
            return "Please enter a valid email address";
        }
        // return true;
    }
    // else if(type=="password"){

    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    //     if(!passwordRegex.test(data)){
    //         return 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    //     }
    //     // return true;

    // }
    else if(type=="fullName"){
        const fullnameRegex = /^[a-zA-Z\s]{3,}$/;

        if(!fullnameRegex.test(data)){
            return 'Full name must contain only alphabets and should be atleast 3 characters long';
        }
        // return true;
    }


}