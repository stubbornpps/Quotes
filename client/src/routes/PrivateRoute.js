import React from 'react'
import {Redirect , Route} from 'react-router-dom';
import {getToken} from '../middleware/middleware';

export const PrivateRoute = ({component:Component,...rest}) =>(
    <Route {...rest} render ={props => getToken() !=null ?(<Component {...props} /> ):(<Redirect to ={{pathname:'/login',state:{from:props.location}}} />
    )
}
/>
);
export const LogRoute = ({component:Component,...rest}) =>(    
    <Route {...rest} render ={props =>getToken() == null ?(<Component {...props} />):(<Redirect to ={{pathname:'/dashboard',state:{from:props.location}}} /> ) } />
)
