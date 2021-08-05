import {loginConst} from '../constant/Login';
import axios from '../axios/Axios.js';

export const Loginaction = (user) =>{
        return (dispatch)=>{
            dispatch({type:loginConst.USER_LOGIN_REQUEST});
            axios.post('/login',{
                ...user                
            })
            .then(res=>{                    
                dispatch({type:loginConst.USER_LOGIN_SUCCESS,payload:res.data});                
            }).catch(error =>{                       
                dispatch({type:loginConst.USER_LOGIN_FAILURE,payload:error.response.data.error_code});                
            })
        }
}
export const Logoutaction = () =>{
    return (dispatch)=>{
        dispatch({type:loginConst.USER_LOGOUT});
    }
}
