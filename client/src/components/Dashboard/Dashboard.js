import React,{useState,useEffect} from 'react';
import {
    Grid,
    Paper,        
    withStyles,      
    Typography,    
}from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch, connect} from "react-redux";
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {Dashboard_actions} from '../../actions/Dashboard'; 
import Spinner from '../Loader/Spinner'; 
import { removeToken } from '../../middleware/middleware';
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
    userSection:{  
        
    },
    quoteSection:{        
        padding:"20px",
    },
    alluserSection:{        
        padding:"20px 10px 10px 10px",
        height:'102%',
    } ,
    userProfilePic:{
        width:'100px',
        height:'100px',
        borderRadius:'50%',        
        marginLeft:'12px',
        border:'0.7px solid white'
    }   ,
    userintialSection:{
        padding:'10px 0 0 0',        
    },
    userName:{
        marginLeft:'15px'
    },  
    menuDiv:{
        padding:'20px',
        width:'100%'
    } ,
    Icons:{
        position:'relative',
        top:'5px',
        marginRight:'5px'        
    },
    userDetailDiv:{
        // background:'#c1ddf6',
        background:'#0070ff',
        width:'100%',
        padding:'10px 12px',
        color:'white'    
    },
    links:{
        textDecoration:'none',
        color:'black',
        marginBottom:'10px'
    },
    linksH6:{
        marginBottom:'13px',
        marginLeft:'9px'
    },
    alluser:{
        marginBottom:'10px',
        [theme.breakpoints.down("xs")]: {
            textAlign:'center'
        },
    },
    allusers:{
        padding:'10px 0px 0px 0px',
        height:'90%',
        overflow:'auto'
    },
    allusersection:{
        display:'flex',
        alignItems:'center',
        marginTop:'10px',
        [theme.breakpoints.down("xs")]: {
            justifyContent:'center'
        },
    },
    alluserProfilePic:{
        width:'50px',
        height:'50px',
        borderRadius:'50%',        
        marginLeft:'12px',
        border:'0.7px solid white'
    },
    containalluser:{
        height:'99%',
        width:'100%'
    },
    quotesHead:{
        textAlign:'center',
        marginBottom:'20px'
    },
    quotesSection:{
        padding:'15px',
        maxHeight:'80vH',
        overflow:'auto'
    },
    quotes:{
        height: '200px',
        width: '80%',
        margin: 'auto',
        // padding:'12px'    
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
        height:'70%',
        padding:'10px',
        textAlign:'center',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        lineHeight:'25px',
        fontWeight:'600'
    },
    noQuotes:{     
        position:'absolute',
        top:'50%',
        left:'41.5%',
        [theme.breakpoints.down("xs")]: {
            position:'static',
            textAlign:'center'
        },
    }
})

function Dashboard({classes,...props}) {    
    const dispatch = useDispatch();
    let [loggedin_user,setLoggedin_user] = useState([]);                 
    let [all_users,setAllusers] = useState([]);                         
    let [quotes,setQuotes] = useState([]);                     
    useEffect(() => {
        dispatch(Dashboard_actions());
    }, []) ;                
    useEffect(() => {             
        if(props.checkerData.login_check_error === 1){
            removeToken();            
            props.history.push('/login');                   
        }       
        if(props.dashboard_data.success === 1){
            setLoggedin_user({...props.dashboard_data.response.user.profile_user});
            setQuotes([...props.dashboard_data.response.quotes]);            
            setAllusers([...props.dashboard_data.response.all_user]);
        }        
    }, [props.dashboard_data.success,props.checkerData.login_check_error]) ;                        
    
    
    return (        
        <div className={classes.Container}>            
            {props.dashboard_data.loading === 1 ? <Spinner display="block" /> :<Spinner display="none" />}
            <Grid container className={classes.rootGrid}  direction="row" justify="space-between" alignItems="flex-start">
                <Grid item lg={2} sm={2} md={3} className={classes.userSection}>
                    <Grid container>
                        <Grid item lg={12}className={classes.userDetailDiv}>
                            <div className={classes.userintialSection}>
                                <img src= {loggedin_user.image}  alt="User Pic" className={classes.userProfilePic}></img>
                            </div>                            
                                <Typography variant="h6" className={classes.userName} >{loggedin_user.full_name}</Typography>
                                <Typography variant="body2" className={classes.userName} >{loggedin_user.email}</Typography>                                                            
                            </Grid>
                            <Grid item lg={12} className={classes.menuDiv}>                                
                                <Link to="/add" className={classes.links}>
                                    <Typography variant='h6' className={classes.linksH6}><QueueRoundedIcon className={classes.Icons}/>Add Quotes</Typography>                                    
                                </Link>
                                <Link to="/view" className={classes.links}>
                                    <Typography variant='h6' className={classes.linksH6}><CollectionsBookmarkIcon className={classes.Icons}/>Quotes</Typography>                                    
                                </Link>                                
                                <Link to="/profile" className={classes.links}>
                                <Typography variant='h6' className={classes.linksH6}><AccountCircleRoundedIcon className={classes.Icons} />Profile</Typography>                                                        
                                </Link>
                            </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={7}  className={classes.quoteSection}>
                 <Grid container >
                     <Grid item lg={12} xs={12} className={classes.quotesHead} >
                        <Typography variant='h3'>Quotes</Typography>                            
                     </Grid>
                     <Grid item lg={12} xs={12} className={classes.quotesSection}>                                                               
                        {
                        quotes.length !== 0 ?                            
                        quotes.map((record,index)=>{
                            return (
                                <Paper elevation={3} className={classes.quotes} key={index}>
                                    <div className={classes.quoteArea}>
                                    {record.quote_note}
                                    </div>
                                    <div className={classes.quoteUser}>
                                        - {record.user_id.full_name}
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
                <Grid item lg={3} xs={12} className={classes.alluserSection}>
                    <Grid container className={classes.containalluser} >    
                        <Grid item lg={12} sm={12} xs={12} className={classes.alluser}>
                            <Typography variant='h6'>Your Companions</Typography>                            
                        </Grid>                        
                        <Grid item lg={12} sm={12} xs={12} className={classes.allusers}>
                            {all_users.map((user_record,index)=>{
                                return (
                                    <div className={classes.allusersection} key={index}>
                                        <img src={user_record.image} alt="User Pic" className={classes.alluserProfilePic}></img>
                                        <Typography variant="body1" className={classes.userName} >{user_record.full_name}</Typography>
                                    </div>
                                )
                            })}                              
                        </Grid>                                                                     
                    </Grid>
                </Grid>                
            </Grid>
        </div>
    )
}
const mapStateToProps_dash = (state) => ({    
     dashboard_data : state.dashData,
     checkerData: state.checkerData,      
  });

export default connect(mapStateToProps_dash)(withStyles(styles)(Dashboard));
