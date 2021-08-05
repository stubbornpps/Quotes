import {signUpConst} from '../constant/Sign.js';

const initState = {    
    error:'',
    success:'',
    loading:'',
    res_message:'',
    loading_signup:0,

};


const signUp = (state =initState , action) =>{    
    switch(action.type){
        case signUpConst.USER_REGISTER_REQUEST :
            state={
                ...state,
                loading:true,
                error:'',
                success:'',
                res_message:'',
                loading_signup:1,
            }                               
            break;
        case signUpConst.USER_REGISTER_SUCCESS :            
            state={
                ...state,                
                success:true,
                res_message:action.payload,
                error:'',
                loading:false,
                loading_signup:0,
            }
            break;    
        case signUpConst.USER_REGISTER_FAILURE :        
            state={
                ...state,
                success:'',            
                error:true,                
                loading:false,
                loading_signup:0,
            }
            break;
        default :   
         state ={...state}
        }
        return state
        
}


export { signUp };