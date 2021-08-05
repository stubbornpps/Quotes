import {dashboardConst} from '../constant/Dashboard';
const Dash_init_state ={
    loading : -1,
    dash_error:-1,
    success:-1,
    err :{},
    response:{},
};
const dashData = (state = Dash_init_state , action) =>{    
    switch(action.type){                 
        case dashboardConst.DASHBOARD_REQUEST:
            state={
                ...state,
                success:0,
                loading : 1,
            }
            break;     
        case dashboardConst.DASHBOARD_SUCCESS:
            state={
                ...state,
                loading:0, 
                success:1, 
                response:action.payload                              
            }
         break;
        case dashboardConst.DASHBOARD_FAILURE:
        state={
            ...state,
            loading:0,
            dash_error:1,
            success:0,
            err:action.payload
        }
        break;
        default :               
         state ={...state}
        }
        return state ;
}
export { dashData };