import React,{useState,useEffect} from 'react';
import {
    Grid,    
    withStyles,          
    Button,   
    Paper,
    Typography     
}from "@material-ui/core";
import ProfDash from '../Dashboard/ProfDash';
import ButterToast, { Cinnamon} from "butter-toast";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch, connect } from "react-redux";
import {getLoggedUser} from '../../middleware/middleware';
import {Quotes_actions} from '../../actions/Quotes'; 
import { removeToken } from '../../middleware/middleware';
import Spinner from '../Loader/Spinner'; 
import Log from '../Dialog/Log';
import { Link } from 'react-router-dom';
const styles = (theme) =>({
    Container:{        
        maxWidth:'100%',    
        height:'91.5vh', 
        flexGrow: "1",
        background:'#f5faff',
        // overflow:'hidden'
    },
    rootGrid:{  
        height:'100%',
    },    
    quoteSection:{        
        padding:"20px",
    },       
    quotesHead:{
        textAlign:'center',
        marginBottom:'20px'
    },
    quotesSection:{
        padding:'15px',
        maxHeight:'80vH',
        overflow:'auto',
        textAlign:'center'
    },
    quotes_edit_link:{
        textDecoration:'none'
    },
    quotes:{
        height: '200px',
        width: '80%',
        margin: 'auto',           
        marginBottom:'15px',
        [theme.breakpoints.down("xs")]: {
            width:'100%',
            height:'300px'
        },
    },
    quoteUser:{
        width:'98%',
        height:'10%',
        padding:'5px',        
        display:'flex',
        alignItems:'center',
        justifyContent:'center'   
    },
    quoteArea:{
        height:'65%',
        padding:'10px',
        textAlign:'center',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        lineHeight:'25px',
        fontWeight:'600',
        [theme.breakpoints.down("xs")]: {
            height:'70%'
        },
    },
    quotes_button:{
        textAlign:'center',
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',        
    },
    quotes_button_actions_1:{
        color:'white',
        backgroundColor:'#0070ff',
        border:'1px solid #0070ff',
        '&:hover':{
            cursor:'pointer',
            color:'#0070ff'
        }
    },
    quotes_button_actions_2:{
        marginLeft:'12px',  
        color:'white',      
        border:'1px solid red',
        backgroundColor:'red',
        '&:hover':{
            cursor:'pointer',
            color:'red'
        }
    },
    noQuotes:{     
        position:'absolute',
        top:'50%',
        left:'53.5%',
        [theme.breakpoints.down("xs")]: {
            position:'static',
            textAlign:'center'
        },
    }
});
function View({classes,...props}) {        
    const dispatch = useDispatch();    
    let [user_quotes,setuser_quotes] = useState([]); 
    let [delete_quote,setDelete_quote] = useState(''); 
    const [actions,setActions] = useState(false);     
    useEffect(() => {
        dispatch(Quotes_actions());
    }, []) ;         
    useEffect(() => {
        if(props.checkerData.login_check_error === 1){
            removeToken();            
            props.history.push('/login');                   
        }    
        if(props.alluserQuotes.success === 1){
            setuser_quotes([...props.alluserQuotes.response.user_quotes]);
        }        
    }, [props.alluserQuotes.success,props.checkerData.login_check_error]);         
    useEffect(() => {
        if(props.alluserQuotes.d_success === 1){
            setActions(false);
            dispatch(Quotes_actions());
            ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success"
                    content="Deleted Successfully !" 
                    scheme={Cinnamon.Crisp.SCHEME_BLUE}
                    icon={<CheckCircleIcon />}
                  />
                ),
              });
        }        
    }, [props.alluserQuotes.d_success]);         
    const delete_quotes = (id) => {   
        setDelete_quote(id);
        setActions(true);           
    }        
    return (        
        <div className={classes.Container}>            
            {props.alluserQuotes.loading === 1 ? <Spinner display="block" /> :<Spinner display="none" />}
            <Log  open={actions}
                  setOpen={setActions}
                  quote_id = {delete_quote} />
            <Grid container className={classes.rootGrid}  direction="row" justify="space-between" alignItems="flex-start">
                <ProfDash setuser = {JSON.parse(getLoggedUser())} />
                <Grid item lg={10}  className={classes.quoteSection}>
                 <Grid container >
                     <Grid item lg={12} xs={12} className={classes.quotesHead} >
                        <Typography variant='h3'>Quotes</Typography>                            
                     </Grid>
                     <Grid item lg={12} xs={12} className={classes.quotesSection}>                                                               
                        { user_quotes.length !== 0 ?                            
                        user_quotes.map((record,index)=>{
                            return (
                                <Paper elevation={3} className={classes.quotes} key={index}>
                                    <div className={classes.quoteArea}>
                                        {record.quote_note}
                                    </div>
                                    <div className={classes.quotes_button}>
                                    <Link className={classes.quotes_edit_link} to={`/edit/${record._id}`} ><Button className={classes.quotes_button_actions_1} variant="outlined" >Edit</Button></Link>
                                    <Button className={classes.quotes_button_actions_2} variant="outlined"  onClick ={()=>{delete_quotes(record._id)}}>Delete</Button>
                                    </div>
                                </Paper>
                            )
                        }):
                        (
                        <h4 className = {classes.noQuotes}>No Quotes Available. </h4>
                        )
                    }                        
                     </Grid>
                 </Grid>

                </Grid>                          
            </Grid>
        </div>
    )
}
const mapStateToProps_getQuote = (state) => ({    
        alluserQuotes : state.quoteData,
        checkerData: state.checkerData,
  });

export default connect(mapStateToProps_getQuote)(withStyles(styles)(View));
