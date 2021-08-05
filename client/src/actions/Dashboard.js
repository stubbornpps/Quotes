import axios from '../axios/Axios.js';
import {dashboardConst} from '../constant/Dashboard';
import {checkerConst} from '../constant/Checker';
import {getIdToken,setLoggedUser} from '../middleware/middleware';

export const Dashboard_actions = () =>{
    return (dispatch)=>{
        let user_local_obj = { ...getIdToken()};
        dispatch({type:dashboardConst.DASHBOARD_REQUEST}); 
        dispatch({type:checkerConst.LOGIN_CHECK_RESET});         
        axios.post('/dashboard',{
            _id:user_local_obj.id
        },{
            headers: {
              'Authorization': `Basic ${user_local_obj.token}` 
        }
    }).then(res=>{
        dispatch({type:dashboardConst.DASHBOARD_SUCCESS,payload:res.data})                
        setLoggedUser(res.data.user.profile_user);        
    }).catch(err=>{        
        if(err.response.status === 401){                                            
            dispatch({type:checkerConst.LOGIN_CHECK_FAILURE,payload:err.response.data});      
        }else
        dispatch({type:dashboardConst.DASHBOARD_FAILURE,payload:err.response})                        
    });        
    }
}