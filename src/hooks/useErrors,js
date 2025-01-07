
import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = [])=>{

    useEffect(()=>{

        //isError : boolean
        //error : object
        //fallback : function (optional) if there is any error then call this function
        
        errors.forEach(({isError, error, fallback})=>{

            if(isError){

                if(fallback){
                    fallback();
                }
                else{
                    toast.error(error?.data?.message || "Something went wrong");
                }

            }

        })
    } , [errors])

}


export default useErrors;