import {profileConst} from '../constant/Profile';
import {checkerConst} from '../constant/Checker';
import axios from '../axios/Axios.js';
import {getIdToken} from '../middleware/middleware';

export const profileData = () =>{
    return (dispatch)=>{             
        let local_obj = { ...getIdToken()};
        dispatch({type:checkerConst.LOGIN_CHECK_RESET});       
        dispatch({type:profileConst.PROFILE_REQUEST});      
        axios.post('/profile',{
            id:local_obj.id
        },{
            headers: {
              'Authorization': `Basic ${local_obj.token}` 
            }
        }) .then(res =>{             
           dispatch({type:profileConst.PROFILE_SUCCESS,payload:res.data});      
        }).catch(err=>{
            if(err.response.status === 401){                                            
                dispatch({type:checkerConst.LOGIN_CHECK_FAILURE,payload:err.response.data});      
            }
            if(err.response.status === 400)
            dispatch({type:profileConst.PROFILE_FAILURE,payload:err.response.data});      
        })       
    }
}
export const profileUpdate = (userData) =>{
    return (dispatch)=>{                    
        const formData = new FormData();
        formData.append('image',userData.image);        
        formData.append('firstName',userData.firstName);
        formData.append('lastName',userData.lastName);
        formData.append('email',userData.email);
        formData.append('mobileNo',userData.mobileNo);
        formData.append('_id',userData._id);        
        let local_obj = { ...getIdToken()};                
        dispatch({type:profileConst.PROFILE_REQUEST});        
        axios.post('/saveProfile',formData,{
            headers: {
            'Content-Type': 'multipart/form-data' ,
              'Authorization': `Basic ${local_obj.token}` ,
            }
        }).then(res=>{                
            dispatch({type:profileConst.PROFILE_SAVE_SUCCESS,payload:res.data});               
        }).catch(err=>{
            if(err.response.status === 500)            
            dispatch({type:profileConst.PROFILE_SAVE_FAILURE,payload:err.response.data});                  
        });
    }
}