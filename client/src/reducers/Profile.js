import {profileConst} from '../constant/Profile';

const initPro = {    
    error : -1,
    success: -1,   
    login_check_error:-1, 
    user:[],
    update_success:-1,    
};
const profileData = (state = initPro , action) =>{    
    switch(action.type){        
        case profileConst.PROFILE_REQUEST:             
            state={
                ...state,
                error:0,
                success:0,                
                update_success:0,
            }   
            break; 
        case profileConst.PROFILE_SUCCESS:
            state={
                ...state,
                error:0,
                success:1,
                user:action.payload,
            }   
            break; 
        case profileConst.PROFILE_FAILURE:
            state={
                ...state,
                login_check_error:0,
                error:1,
                err_msg:action.payload,
                success:0,
                user:[],
            }   
            break; 
        case profileConst.PROFILE_SAVE_SUCCESS:
            state={
                ...state,
                login_check_error:0,
                error:0,
                update_success:1,                
            }   
            break; 
        case profileConst.PROFILE_SAVE_FAILURE:
            state={
                ...state,
                login_check_error:0,
                error:1,
                update_success:0,
                err_msg:action.payload
            }   
            break; 
        default :               
         state ={...state}
        }
        return state ;
}
export { profileData };