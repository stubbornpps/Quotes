import React, { useState,useEffect } from 'react';
import {        
    Grid,    
    withStyles,        
    Typography,
    Button,
    CssBaseline,
    Link,    
    InputBase
  } from "@material-ui/core";  
import LoginImage from '../../images/sharing.png';
import ButterToast, { Cinnamon} from "butter-toast";
import Footer from "../Footer/Footer";
import { useDispatch, connect } from "react-redux";
import {Loginaction} from '../../actions/Login';
import CancelIcon from "@material-ui/icons/Cancel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {setToken,getToken} from '../../middleware/middleware';
import {GoogleLogin} from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import Spinner from '../Loader/Spinner'; 

const styles = (theme) => ({
    root: {
        height: '93vh',
      },
    image: {
        backgroundImage: 'url('+LoginImage+')',
        backgroundRepeat: 'no-repeat',        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    loginsection:{
        width:'100%',
        height:'100%',
        backgroundColor:'#0070ff',     
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:'9px'
    },
    submit:{
        "&:hover": {      
            color: "#0070ff",
            backgroundColor:'white'
        },
        color:'white',
        padding:'9px',
        borderRadius:'20px',
        backgroundColor:'#5a9ef1'    
    },
    formdiv:{
        width:'80%',        
    },
    inputdiv:{
        marginBottom:'30px',               
    },
    textinput:{
        color:'black',                     
        border:'2px solid white',        
        borderRadius:'20px',
        padding:theme.spacing(1),
        backgroundColor:'white',          
    },    
    inputfield:{
        padding:'10px',            
    },
    btnlabel:{
        fontSize:'19px',
        letterSpacing:'2px',        
    },
    font_icn:{     
        fontSize:'30px',color:'white',cursor:'pointer',   
        
    },
    err_msg:{
        color:'red',        
        marginLeft:'21px',
        marginTop:'4px'

    },
    g_icn:{
        "&:hover": {
            color: "#F4B400",
          },
    },
    f_icn:{
        "&:hover": {
            color: "#4267B2",
          },
    },
});
function Login({ classes, ...props }) {        
    const initalState = {
        email:'',
        password:''
    }    
    const [login , setLogin] = useState(initalState);    
    const [err,setErr] = useState(initalState);
    const dispatch = useDispatch();       
    // const responseFacebook = (response) => {
    //     console.log(response);
    // }
    const googleSuccess = async (res) =>{
        const userObj ={};
        userObj.firstName = res.profileObj.givenName;
        userObj.lastName = res.profileObj.familyName;
        userObj.email = res.profileObj.email;        
        userObj.password = res.profileObj.googleId;
        userObj.mobileNo = '';                       
        dispatch(Loginaction({...userObj,auth:1 }));   
    }                                       
    const googleFailure = () =>{
        ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Oops..."
                content="Something Went Wrong" 
                scheme={Cinnamon.Crisp.SCHEME_BLUE}
                icon={<CancelIcon />}
              />
            ),
          });                                      
    }
    const pop_desc = (vale) =>{
        if(vale){
        ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Oops..."
                content="You are logged Out. Please sign in !" 
                scheme={Cinnamon.Crisp.SCHEME_BLUE}
                icon={<CancelIcon />}
              />
            ),
          }); 
        }
    }    
    const validateForm  = () =>{
        let log_err  = false;        
        let err_obj = {};
        if(!login.email.trim()){
            log_err = true;
            err_obj.email = "Email field is required *";
        }else if(login.email){
            if (/\S+@\S+\.\S+/.test(login.email))
              {
                log_err=false;                
              }else{                  
                  log_err= true;
                  err_obj.email ="Email is invalid *";          
              }
        }   
        if(!login.password.trim()){
            log_err = true;
            err_obj.password = "Password field is required *";
        }
        setErr({...err_obj});        
        return log_err;
    } 
    const loginSubmit = (e) =>{
        e.preventDefault();            
        if(!validateForm()){            
            dispatch(Loginaction({...login,auth:0}));
        }
    }    
    useEffect(() => {           
        if(props.logMsg.login_check_error === 1 ){                      
            pop_desc(true);
        }                
    },[props.logMsg.login_check_error])     
    useEffect(() => {           
        if(getToken() === null && props.responseSign.status===1){                        
            setToken(props.responseSign.res.token,props.responseSign.res.user.email,props.responseSign.res.user._id);                                   
            props.history.push('/dashboard');
        }        
        if(props.responseSign.exp_status === 1){
            pop_desc(true);   
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.responseSign.status,props.responseSign.exp_status])
    useEffect(() => {  
        if(parseInt(props.responseSign.error_code) === 1){                                                
                ButterToast.raise({
                  content: (
                    <Cinnamon.Crisp
                      title="Oops..."
                      content="User Does not exists !" 
                      scheme={Cinnamon.Crisp.SCHEME_BLUE}
                      icon={<CancelIcon />}
                    />
                  ),
                });                              
        }                
        if(parseInt(props.responseSign.error_code) === 2){                       
                ButterToast.raise({
                  content: (
                    <Cinnamon.Crisp
                      title="Oops..."
                      content="Incorrect Password !" 
                      scheme={Cinnamon.Crisp.SCHEME_BLUE}
                      icon={<CancelIcon />}
                    />
                  ),
                });                              
        }
    }, [props.responseSign.error_code])
    return (
        <>                
                <Grid container className = {classes.root}>                                                                
                {props.responseSign.loading === 1 ? <Spinner display="block" /> :<Spinner display="none" />}
                    <CssBaseline />
                    <Grid item xs={12} sm={4} md={6} lg={6} >
                        <div className={classes.loginsection}>      
                            <div>      
                                <Typography component="h1" variant="h2" style={{color:'white', letterSpacing:'2px'}} gutterBottom='true'>
                                    Welcome
                                </Typography>
                            </div>                            
                            <div className={classes.formdiv}>                               
                            <form> 
                                <div className={classes.inputdiv}>                              
                            <InputBase  
                            variant="outlined"
                            margin="normal"
                            required                            
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus                            
                            type='text'
                            error='true'
                            onChange={(e)=>{
                                setLogin({
                                    ...login,
                                    email:e.target.value
                                })
                                setErr({...err,email:''})      
                            }}
                            placeholder='Enter Your Email'
                            className={classes.textinput}
                            classes={{
                                input:classes.inputfield
                            }}                                                        
                            />      
                             <p className={classes.err_msg}>{err.email !=='' && err.email !== undefined ? (err.email): ('') } </p>                      
                             </div>
                             <div className={classes.inputdiv}>      
                            <InputBase
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange ={(e)=>{
                                setLogin({
                                    ...login,
                                password:e.target.value                            
                                })        
                                setErr({...err,password:''})                              
                            }}
                            placeholder="Enter Your Password"
                            className={classes.textinput}                                                        
                            autoComplete="current-password"
                            classes={{
                                input:classes.inputfield
                            }}
                                                
                            />

                               <p className={classes.err_msg}>{err.password !== '' && err.password !== undefined ? (err.password):('')}  </p>
                               </div>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"                            
                            className={classes.submit}
                            onClick={loginSubmit}
                            classes={{
                               label:classes.btnlabel
                            }}
                            >
                            Sign In
                            </Button>
                            <Grid container style={{marginTop:'25px'}} xs={12} lg={12}>
                                <Grid item xs={6} lg={6}>
                                    <Link href="/forgotpassword" variant="body2" style={{color:'white'}} gutterBottom>
                                    Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item xs={6} lg={6} style={{color:'white',textAlign:'right'}}>
                                    <Link href="/signup" variant="subtitle2" style={{color:'white',textAlign:'right'}} gutterBottom>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            </form>
                            </div>
                            <div style={{marginTop:"25px",padding:'20px'}}>      
                            <Grid container>
                                <Grid item style={{marginRight:'50px'}} >
                                    <GoogleLogin
                                        clientId="536675379382-ar26rnlo4p1r15ibjatb41kgvq7185kl.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <FontAwesomeIcon icon={['fab', 'google']} onClick={renderProps.onClick} disabled={renderProps.disabled} className={`${classes.font_icn} ${classes.g_icn}`}  />
                                          )}           
                                          onSuccess={googleSuccess}
                                        onFailure={googleFailure}                                                                  
                                        cookiePolicy={'single_host_origin'}
                                     />                                    
                                </Grid>                                
                            </Grid>
                            </div>                            
                        </div>
                    </Grid>
                    <Grid item xs={false} sm={4} md={6} lg={6} className={classes.image} ></Grid>
                </Grid>                                    
            <Footer />           
        </>
    )
}

const mapStateToProps = (state) => ({
    responseSign: state.Login,    
    logMsg : state.checkerData          
  });
  
export default  connect(mapStateToProps)(withStyles(styles)(Login))
