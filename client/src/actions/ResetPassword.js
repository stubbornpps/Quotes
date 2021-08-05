import {resetpasswordConst} from '../constant/ResetPassword';
import axios from '../axios/Axios.js';

export const resetpassword = (email) =>{
        return (dispatch)=>{            
            dispatch({type:resetpasswordConst.RESET_PASSWORD_REQUEST});
            axios.post('/forgotpassword',{
                ...email    
            })
            .then(res=>{                             
                dispatch({type:resetpasswordConst.RESET_PASSWORD_SUCCESS});                
            }).catch(error =>{                       
                dispatch({type:resetpasswordConst.RESET_PASSWORD_FAILURE,payload:error.response.data.error_code});                
            })
        }
}

export const tokenpasswordCheck = (token) =>{
    return (dispatch) =>{
        dispatch({type:resetpasswordConst.RESET_CHECKING_REQUEST});        
        axios.get(`/passwordreset/${token}`)
        .then(res=>{            
                dispatch({type:resetpasswordConst.RESET_CHECKING_SUCCESS});
        }).catch(error=>{                                 
            if(error.response.status === 401){                
                dispatch({type:resetpasswordConst.RESET_CHECKING_FAILURE});                
            }else{
                alert('Something really went Wrong !');
            }
        })
    }
}
export const tokenpasswordSave = (token,password) =>{
    return(dispatch)=>{        
        dispatch({type:resetpasswordConst.RESET_SAVE_REQUEST});     
        axios.post(`/passwordreset/${token}`,{
            password:password
        })   
        .then(res =>{            
            dispatch({type:resetpasswordConst.RESET_SAVE_SUCCESS});                
        }).catch(error=>{
            if(error.response.status === 401){   
            dispatch({type:resetpasswordConst.RESET_SAVE_FAILURE});                
            }else{
                alert('Something really went Wrong !');
            }
        })    
    }
}