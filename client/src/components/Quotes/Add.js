import React,{useState,useEffect} from 'react';
import {Grid,withStyles,Typography,Button,TextField}from "@material-ui/core";
import {useDispatch,connect} from "react-redux";
import ButterToast, { Cinnamon} from "butter-toast";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { removeToken } from '../../middleware/middleware';
import {getLoggedUser,getIdToken} from '../../middleware/middleware';
import ProfDash from '../Dashboard/ProfDash'; 
import { Quote_add,single_quotes,edit_quotes } from '../../actions/Quotes';
import Spinner from '../Loader/Spinner'; 
import {
    useParams,
    useLocation
  } from "react-router-dom";
import Footer from '../Footer/Footer';
const styles = (theme) =>({
    Container:{        
        maxWidth:'100%',    
        height:'91.5vh', 
        flexGrow: "1",
        background:'#f5faff',      
    },
    rootGrid:{  
        height:'100%',        
    },   
    quotesHead:{
        height:'120px',
        padding:'22px 10px',
        textAlign:'center',        
    },
    formField:{   
        height:'420px',     
        display:'flex',
        justifyContent:'center'
    },
    rootform:{
        padding:'20px',        
        height:'100%',
        width:'70%',             
        boxShadow : '0px 0px 20px #d3d3d3b8',
        [theme.breakpoints.down("sm")]: {
            width:'90%'
        },       
    },
    addEditBtn:{
        width:'100%',
        padding:'10px',
        background:'#0070ff'
    },
    addQuoteNew:{
        width:'100%',   
        marginTop:'15px',          
    },
    AddEdit:{
        marginTop:'30px'
    },
    quotehead:{
        marginTop:'8px',
    }   
})

function Add({classes,...props}) {        
    const { id } = useParams();      
    const location = useLocation();    
    const dispatch = useDispatch();  
    let user_local_obj = { ...getIdToken()};   
    let [quote,setQuote] = useState({
        quoteNote:'',
        userId: user_local_obj.id
    });     
    const add_quote = ()=>{
        if(location.pathname !== '/add'){
            let edit_quote = {quote_id:id,...quote};                                                            
            dispatch(edit_quotes(edit_quote));            
        }else{
            dispatch(Quote_add(quote));
        }
    };                
    useEffect(()=>{
        if(location.pathname !== '/add'){
            dispatch(single_quotes(id));             
        }
    },[]);
    useEffect(()=>{
        if(props.add_notify.g_success === 1){
            if(location.pathname !== '/add'){
            setQuote({
                ...quote,
                quoteNote: props.add_notify.g_data !== undefined ? props.add_notify.g_data.get_quotesid.quote_note :''
            })  
        }   
        }                                 
    },[props.add_notify.g_success])
    useEffect(() => {        
        if(props.add_notify.a_success === 1){
            if(location.pathname !== '/add'){
                ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Success"
                        content="Updated Successfully !" 
                        scheme={Cinnamon.Crisp.SCHEME_BLUE}
                        icon={<CheckCircleIcon />}                    
                      />
                    ),
                  });
            }else{            
                ButterToast.raise({
                    content: (
                    <Cinnamon.Crisp
                        title="Success"
                        content="Added Successfully !" 
                        scheme={Cinnamon.Crisp.SCHEME_BLUE}
                        icon={<CheckCircleIcon />}                    
                    />
                    ),
                });
                setQuote({quoteNote:""});
            }
            if(props.checkerData.login_check_error === 1){
                removeToken();            
                props.history.push('/login');                   
            }    
        }        
    }, [props.add_notify.a_success,props.checkerData.login_check_error]) ;        
    return (        
        <div className={classes.Container}>            
            {/* {props.dashboard_data.loading === 1 ? <Spinner display="block" /> :<Spinner display="none" />} */}
            <Grid container className={classes.rootGrid}  direction="row" justify="space-between" alignItems="flex-start">
                <ProfDash setuser = {JSON.parse(getLoggedUser())} />             
                <Grid item lg={10} sm={9}  className={classes.quoteSection}>
                    <Grid container >
                        <Grid item lg={12} xs={12} className={classes.quotesHead} >
                            <Typography variant='h3'>
                                {location.pathname !== '/add'?'Edit your quote': 'Add your quote'}                                
                            </Typography>                            
                        </Grid>
                        <Grid item lg={12} xs={12} className={classes.formField} >
                            <form className={classes.rootform} noValidate autoComplete="off">            
                                <div>
                                <Typography variant='h5' gutterBottom className={classes.quotehead}>Enter Quote</Typography>                                
                                <TextField
                                    id="outlined-multiline-static"                                    
                                    multiline
                                    rows={10}
                                    variant="outlined"
                                    className={classes.addQuoteNew}
                                    onChange={(e)=>{
                                        setQuote({
                                            ...quote,
                                            quoteNote:e.target.value
                                        })
                                    }}
                                    value={quote.quoteNote }     
                                    />                                
                                </div>
                                <div className={classes.AddEdit}>
                                    <Button className={classes.addEditBtn} variant="contained" color="primary" onClick={add_quote}>
                                        {location.pathname !== '/add'?'Edit': 'Add'}
                                    </Button>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                    <Footer/>
                </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps_addQuote = (state) => ({         
    add_notify : state.quoteData,  
    checkerData: state.checkerData,       
});

export default connect(mapStateToProps_addQuote)(withStyles(styles)(Add));
