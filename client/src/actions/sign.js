import {signUpConst} from '../constant/Sign.js';
import axios from '../axios/Axios.js';

export const signUp = (user,onResponse) =>{
    return (dispatch)=>{
        dispatch({type:signUpConst.USER_REGISTER_REQUEST});
        axios.post('/signup',{
            ...user,
            auth:0
        })
        .then(res=>{            
            if(res.status === 200){
                dispatch({type:signUpConst.USER_REGISTER_SUCCESS,
                    payload:res.data
                });                
                onResponse('success',res.data)            
            }
        })
        .catch(error=>{                         
            dispatch({type:signUpConst.USER_REGISTER_FAILURE});
            onResponse('error',error.response.data.message)
        })
    }
}