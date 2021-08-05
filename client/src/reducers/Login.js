import {loginConst} from '../constant/Login';


const initLog ={
    status:-1,
    res:[],
    error_code:-1,
    loading:0,    
}

export const Login = (state=initLog, action )=>{
            switch(action.type){
                case loginConst.USER_LOGIN_FAILURE:
                    state={
                        ...state,
                        status:0,
                        loading:0,
                        error_code:action.payload,                        
                    }
                    break;
                case loginConst.USER_LOGIN_REQUEST:
                    state={
                        ...state,
                        status:-1,
                        loading:1,
                        error_code:-1,                          
                    }
                    break;
                case loginConst.USER_LOGIN_SUCCESS:
                    state={
                        ...state,
                        status:1,
                        loading:0,
                        error_code:0,
                        res:action.payload
                    }
                    break;
                case loginConst.USER_LOGOUT:
                    state={
                        ...state,
                        status:-1,                                                
                    }
                    break;                
                default:
                    state={...state}
            }
            return state
}