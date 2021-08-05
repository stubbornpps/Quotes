import {quotesConst} from '../constant/Quotes';
const Quote_init_state ={
    loading : -1,
    quote_error:-1,
    success:-1,
    g_success:-1,
    d_success:-1,
    a_success:-1,
    err :{},
    response:[],
};
const quoteData = (state = Quote_init_state , action) =>{    
    switch(action.type){  
        case quotesConst.QUOTES_REQUEST:
            state={
                ...state,
                success:0,
                d_success:0,
                a_success:0,
                g_success:0,
                loading : 1,
            }
            break;     
        case quotesConst.QUOTES_SUCCESS:
            state={
                ...state,
                loading:0, 
                success:1, 
                response:action.payload                              
            }
         break;
        case quotesConst.QUOTES_FAILURE:
        state={
            ...state,
            loading:0,
            quote_error:1,
            success:0,
            err:action.payload
        }
        break;                       
        case quotesConst.QUOTES_D_SUCESS:
        state={
            ...state,
            loading:0,
            d_success:1,            
        }
        break; 
        case quotesConst.QUOTES_G_SUCESS:
        state={
            ...state,
            loading:0,
            g_success:1,  
            g_data:action.payload          
        }
        break; 
        case quotesConst.QUOTES_A_SUCESS:
            state={
                ...state,
                loading:0,
                a_success:1,            
            }
            break;                       
        default :               
         state ={...state}
        }
        return state ;
}


export { quoteData };