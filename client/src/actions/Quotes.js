import axios from '../axios/Axios.js';
import {quotesConst} from '../constant/Quotes';
import {getIdToken} from '../middleware/middleware';
import {checkerConst} from '../constant/Checker';

export const Quotes_actions = () =>{
    return (dispatch)=>{
        let user_local_obj = { ...getIdToken()};  
        dispatch({type:quotesConst.QUOTES_REQUEST});      
        dispatch({type:checkerConst.LOGIN_CHECK_RESET});         
        axios.post('/getquotes',{
            _id:user_local_obj.id
        },{
            headers: {
              'Authorization': `Basic ${user_local_obj.token}` 
        }
        }).then(res=>{              
            dispatch({type:quotesConst.QUOTES_SUCCESS,payload:res.data});            
        }).catch(err=>{
            if(err.response.status === 401){                                            
                dispatch({type:checkerConst.LOGIN_CHECK_FAILURE,payload:err.response.data});      
            }else
            dispatch({type:quotesConst.QUOTES_FAILURE,payload:err.response})                        
        })
    }
}

export  const  Quote_add = (new_quote) =>{       
    return (dispatch)=>{        
        let user_local_obj = {...getIdToken()};
        dispatch({type:quotesConst.QUOTES_REQUEST});         
        axios.post('/addquote',{
            quote_note:new_quote.quoteNote,
            user_id : new_quote.userId                                
        },{
            headers:{
                'Authorization': `Basic ${user_local_obj.token}` 
            }
        }).then(res=>{
            dispatch({type:quotesConst.QUOTES_A_SUCESS,payload:res.data}); 
        }).catch(err =>{
            if(err.response.status === 401){                                            
                dispatch({type:checkerConst.LOGIN_CHECK_FAILURE,payload:err.response.data});      
            }else
            dispatch({type:quotesConst.QUOTES_FAILURE,payload:err.response});
        })
    }
}


export const Quotes_delete = (quote_id) =>{
    return (dispatch)=>{           
        let user_local_obj = { ...getIdToken()};            
        dispatch({type:quotesConst.QUOTES_REQUEST});      
        axios.post('/deletequote',{
            _id:quote_id
        },{
            headers: {
              'Authorization': `Basic ${user_local_obj.token}` 
        }
        },
        ).then(res=>{
            dispatch({type:quotesConst.QUOTES_D_SUCESS,payload:res.data});            
        }).catch(err=>{
            dispatch({type:quotesConst.QUOTES_FAILURE,payload:err.response});                        
        })
    }   
}

export const single_quotes = (quote_id) =>{
    return (dispatch)=>{           
        let user_local_obj = { ...getIdToken()};            
        dispatch({type:quotesConst.QUOTES_REQUEST});      
        axios.post('/quotesbyid',{
            _id:quote_id
        },{
            headers: {
              'Authorization': `Basic ${user_local_obj.token}` 
        }
        },
        ).then(res=>{            
            dispatch({type:quotesConst.QUOTES_G_SUCESS,payload:res.data});            
        }).catch(err=>{
            if(err.response.status === 401){                                            
                dispatch({type:checkerConst.LOGIN_CHECK_FAILURE,payload:err.response.data});      
            }else
                dispatch({type:quotesConst.QUOTES_FAILURE,payload:err.response});                        
        })
    }   
}

export const edit_quotes = (edit_quote) =>{
    return (dispatch)=>{                   
        let user_local_obj = { ...getIdToken()};            
        dispatch({type:quotesConst.QUOTES_REQUEST});      
        axios.post('/editquote',{
            quote_id:edit_quote.quote_id,
            user_id:edit_quote.user_id,
            quote_note:edit_quote.quoteNote
        },{
            headers: {
              'Authorization': `Basic ${user_local_obj.token}` 
        }
        },
        ).then(res=>{            
            dispatch({type:quotesConst.QUOTES_A_SUCESS,payload:res.data});            
        }).catch(err=>{
            dispatch({type:quotesConst.QUOTES_FAILURE,payload:err.response});                        
        })
    }   
}
