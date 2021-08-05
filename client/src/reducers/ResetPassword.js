import {resetpasswordConst} from '../constant/ResetPassword.js';

const initState = {    
    loading_spinner:0,
    error:-1,
    status:-1,
    checking_error:-1,
    checking_success:-1,
    save_error:-1,
    save_success:0
};
const resetPassword = (state = initState , action) =>{    
    switch(action.type){    
        case resetpasswordConst.RESET_PASSWORD_REQUEST:
            state ={       
                ...state,                                    
                error:0,  
                status:0,
                loading_spinner:1,       
            }
            break;
        case resetpasswordConst.RESET_PASSWORD_SUCCESS:            
            state ={   
                ...state,             
                error:0,   
                status:1 ,
                loading_spinner:0,   
            }
            break;
        case resetpasswordConst.RESET_PASSWORD_FAILURE:
            state ={ 
                ...state,               
                error:1,                                
                status:0,
                loading_spinner:0,   
            }
            break;
        case resetpasswordConst.RESET_CHECKING_REQUEST:
            state ={ 
                ...state,               
                checking_error:0,                                
                checking_success:0,
                loading_spinner:1,   
            }
            break;
        case resetpasswordConst.RESET_CHECKING_SUCCESS:
            state ={ 
                ...state,               
                checking_error:0,                                
                checking_success:1,
                loading_spinner:0,   
            }
            break;
        case resetpasswordConst.RESET_CHECKING_FAILURE:
            state ={ 
                ...state,               
                checking_error:1,                                
                checking_success:0,
                loading_spinner:0,   
            }
            break;
        case resetpasswordConst.RESET_SAVE_FAILURE:
            state ={                 
                save_error:1,                                
                save_success:0,
                loading_spinner:0,   
            }
            break;
        case resetpasswordConst.RESET_SAVE_REQUEST:
            state ={                 
                save_error:0,                                
                save_success:0,
                loading_spinner:1,   
            }
            break;
        case resetpasswordConst.RESET_SAVE_SUCCESS:
            state ={                 
                save_error:0,                                
                save_success:1,
                loading_spinner:0,   
            }
            break;
        default :   
         state ={...state}
        }
        return state       
}
export { resetPassword };