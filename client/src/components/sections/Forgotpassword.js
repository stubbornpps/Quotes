import React,{useState,useEffect} from 'react';
import {        
    Grid,    
    withStyles,        
    Typography,
    Button,
    CssBaseline,        
    TextField,
    Container    
  } from "@material-ui/core";  
  import AtomLogo from '../../images/atom.png';
  import {useParams,useLocation } from "react-router-dom";
  import Footer from "../Footer/Footer";    
  import { useDispatch, connect } from "react-redux";  
  import {resetpassword,tokenpasswordCheck,tokenpasswordSave} from '../../actions/ResetPassword';
  import Spinner from '../Loader/Spinner';
  const styles = (theme) => ({
      root:{
        width:'100%',
        height:'100%',
      },
        container:{
            paddingTop:'50px',
            background:'#0070ff',
            minHeight:'93vH !important'
        },
        gridContainer:{                
            height:'500px',
            
        },
        imgAtom:{
            width:'100px',
            height:'100px'
        },
        logoDiv:{
            textAlign:'center',
            marginBottom:'25px'
        },
        msg:{
            textAlign:'center',
        },
        emaildiv:{
            background:'white',
            width:'100%',
            height:'70%',
            padding:'17px',
            borderRadius:'2px',
        },
        emailForm:{            
            width:'100%',
            height:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around',            
            alignItem:'center',
        },
        containerItem:{
            width:'100%',
            position:'relative',
            height:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around',
            textAlign:'center',
            alignItem:'center',
        },
        subBtn:{
            background:'#0070ff',
            color:'white',
            padding:'10px',
            fontWeight:'600',
            letterSpacing:'2px',
            marginTop:'12px',
            "&:hover":{
                color:'#0070ff',
                background:'white'
            }
        },        
    });
function Forgotpassword({classes,...props}) {  
    let { token }  = useParams();             
    const [email, setEmail] = useState({email:''});
    const [error, setError] = useState({email:'',password:'',confirmPassword:'',password_match:''});  
    const [password,setPassword] = useState({password:'',confirmPassword:''})
    const dispatch = useDispatch();
    const location = useLocation();    
    useEffect(()=>{        
        if(location.pathname !== '/forgotpassword/'){
            if(props.responseResetPassword.checking_error !== 1){
                dispatch(tokenpasswordCheck(token));                                           
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
        if(props.responseResetPassword.save_success ===1){
            setTimeout(function(){ 
                props.history.push('/login');
             }, 3000);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.responseResetPassword.save_success])
    const validateForm = ()=>{
        let err = false;
        const err_obj={};
        if(!email.email.trim() && email.email !== undefined){
            err = true;
            err_obj.email = "Email field is required *";
        }else if(email.email){
            if (/\S+@\S+\.\S+/.test(email.email))
              {
                err=false;                
              }else{                  
                  err= true;
                  err_obj.email ="Email is invalid *";          
              }
        }
        setError({...err_obj});
        return err; 
    }
    const validateForm2 = () =>{
        let err = false;
        const err_obj={};
        if(!password.password.trim() && password.password !== undefined){
            err = true;
            err_obj.password = "Password field is required *";
        }
        if(!password.confirmPassword.trim() && password.confirmPassword !==undefined){
            err = true;
            err_obj.confirmPassword = "Confirm Password field is required *";
        }
        if(password.password.trim() !== password.confirmPassword.trim()){
            err = true;
            err_obj.password_match = 1;
        }

        setError({...err_obj});
        return err;
    }
    const emailSent =()=>{
        if(!validateForm()){                        
            dispatch(resetpassword(email));
        }        
    }
    const passwordSave =()=>{
        if(!validateForm2()){            
            setError({email:'',password:'',confirmPassword:'',password_match:''});            
            dispatch(tokenpasswordSave(token,password.password));
        }        
    }        
    return (
        <>
        <Container component="main" maxWidth="" className={classes.container}>
        <CssBaseline />        
        {props.responseResetPassword.loading_spinner === 1 ? <Spinner display="block" /> :<Spinner display="none" />}
        
        <Grid container spacing={3}  lg={12} style={{height:'100% !important; '}}> 
        <Grid item xs={0} lg={4} md={3}>                                      
        </Grid>
        <Grid item xs={12} lg={4} className={classes.gridContainer} md={6}>                          
            <div className={classes.containerItem}>
                <div className={classes.logoDiv}>
                <img alt="Brand Logo" src={AtomLogo} className={classes.imgAtom} />
                </div>    
                <div className={classes.emaildiv}>
                {location.pathname==='/forgotpassword' ? (
                    <form noValidate className={classes.emailForm}>
                    <Typography variant="h4" gutterBottom style={{color:'#0070ff',fontWeight:'600'}}>Forgot Password </Typography>            
                    {props.responseResetPassword.status === 1 ? (
                        <div  className={`${classes.emailForm} ${classes.emailFormMsg}`  }>
                            <Typography variant="p" style={{marginBottom:'15px',padding:'20px',border:'1px solid rgb(0 102 204 / 50%)',background:'rgb(0 102 204 / 22%)'}}> Email is sent to your email . Please check and move further.  </Typography>            
                        </div>
                    ) : (
                        <div  className={classes.emailForm}>
                        <Typography variant="p" style={{marginBottom:'15px'}}>Please enter your associated email with the account. </Typography>            
                        <TextField
                    id="outlined-multiline-flexible"
                    label="Email Address"                                
                    variant="outlined"
                    {...(error.email !=='' && error.email !== undefined?({error:true}):(''))}                                                                  

                    onChange={
                        (e)=>{
                            setEmail({
                                ...email,
                                email:e.target.value
                            })
                            setError({...error,email:''});
                        }
                    }
                    helperText={error.email}

                    />
                    <Button variant="contained" className={classes.subBtn} onClick={emailSent}>Submit</Button>
                    </div>
                    )  }                    
                </form>
                ):(
                    <form noValidate className={classes.emailForm}>
                   {props.responseResetPassword.checking_error !== 1 ?                       
                   props.responseResetPassword.save_success !==1 ?
                    <Typography variant="h4" gutterBottom style={{color:'#0070ff',fontWeight:'600'}}>Confirm Password </Typography> :<Typography variant="h4" gutterBottom style={{color:'#85ff00',fontWeight:'600'}}>Password Saved </Typography>                           
                   :<Typography variant="h4" gutterBottom style={{color:'red',fontWeight:'600'}}>Oopps.. </Typography>}     
                {props.responseResetPassword.checking_error === 1 ?(
                    <div  className={`${classes.emailForm} ${classes.emailFormMsg}`  }>
                        <Typography variant="p" style={{marginBottom:'15px',padding:'20px',border:'1px solid rgb(255 0 47 / 50%)',background:'rgb(204 0 0 / 22%)'}}> Password reset token is invalid or has expired . Check Again !  </Typography>            
                    </div>
                ):(
                    <>
                    {error.password_match === 1 ? (
                        <div style={{width:'100%',height:'20px',marginBottom:'12px'}}>
                            <p style={{color:'red'}}>Password is not matching !</p>
                        </div>
                    ):(<></>)}
                    {props.responseResetPassword.save_success === 1 ?(
                        <div  className={`${classes.emailForm} ${classes.emailFormMsg}`  }>
                        <Typography variant="p" style={{marginBottom:'15px',padding:'20px',border:'1px solid rgb(0 255 55 / 50%)',background:'rgba(0, 255, 55, 0.22)'}}> Password changes either wait to redirect or please login !  </Typography>            
                        </div>
                    ):(
                      <>
                      <TextField
                    id="outlined-multiline-flexible"
                    label="New Password"                         
                    type="password"  
                    variant="outlined"
                    {...(error.password !=='' && error.password !== undefined?({error:true}):(''))}                                                                  
                    onChange={(e)=>{
                        setPassword({
                            ...password,
                            password:e.target.value
                        })
                        setError({
                            ...error,
                            password:''
                        })
                    }}
                    helperText={error.password}
                    style={{marginBottom:'20px'}}
                    />
                        <TextField
                    id="outlined-multiline-flexible"
                    label="Confirm Password"
                    type="password" 
                    {...(error.confirmPassword !=='' && error.confirmPassword !== undefined?({error:true}):(''))}                                                                       
                    onChange={(e)=>{                    
                        setPassword({
                            ...password,
                            confirmPassword:e.target.value
                            
                        })
                        setError({
                            ...error,
                            confirmPassword:''
                        })
                    }}                
                    helperText={error.confirmPassword} 
                    variant="outlined"                
                    />
                    <Button variant="contained" className={classes.subBtn} onClick={passwordSave}>Save</Button>
                      </>  
                    )}
                    
                    </>
                )}
                    
            </form>
                )}            
            </div>
            </div>
        </Grid>
        <Grid item xs={0} lg={4} md={3}>                                      
        </Grid>
        </Grid>                
        </Container>
         <Footer />   
        </>
    )
}


const mapStateToProps = (state) => ({
    responseResetPassword: state.resetPassword,
  });
  

export default connect(mapStateToProps)(withStyles(styles)(Forgotpassword))
