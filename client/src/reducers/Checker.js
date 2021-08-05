import {checkerConst} from '../constant/Checker';
const checkerData = (state = {} , action) =>{    
    switch(action.type){    
        case checkerConst.LOGIN_CHECK_RESET:
            state={
                ...state,
                login_check_error:0,
            } 
            break; 
        case checkerConst.LOGIN_CHECK_FAILURE:             
            state={
                ...state,
                login_check_error:1,
            }   
            break;         
        default :               
         state ={...state}
        }
        return state ;
}
export { checkerData };