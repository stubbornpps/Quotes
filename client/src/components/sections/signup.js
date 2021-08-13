import React, { useState } from "react";
import {
  Grid,
  Paper,
  withStyles,  
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import signin from "../../images/sign-in.png";
import Footer from "../Footer/Footer";
import ButterToast, { Cinnamon} from "butter-toast";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch, connect } from "react-redux";
import Spinner from '../Loader/Spinner';
import { signUp } from "../../actions/sign.js";

const styles = (theme) => ({
  signupPage:{
    height:"100%",
    minWidth:"100vw"
  },
  div: {
    // background:'orange',
    height: "88vh",
  },
  background1: {
    background: "red",
  },
  leftdiv: {
    paddingTop: "55px",
    height: "100%",
  },
  rightdiv: {
    position: "relative",
    display:"flex",
    justifyContent:"center",
    alignItem:'center'  
  },
  paper: {
    position: "absolute",
    left: "80px",
    top: "100px",
    height: "auto",
    width: "50%",
    padding: "20px",
    boxShadow: "1px 1px 10px #00000040;", 
    [theme.breakpoints.up("lg")]: {
      top:"54px !important", 
    },   
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "1px",
      top:'0px'
    },
    [theme.breakpoints.up("sm")]: {      
      top: "-23px",
      left: "23%",
    }
  },
  paperdiv: {
    padding: "12px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItem: "space-around",
  },
  form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),        
        width: '20ch',        
      },
            
    width:"100%",
    marignTop: "12px",
  },
  signupBtn:{
    "&:hover": {      
      backgroundColor: "rgb(84 154 241)"
  },
    backgroundColor: "#0070ff",
    padding:" 11px 33px",
    color: "white",
    border:" none",
    marginTop:theme.spacing(2)
  },
  textinput:{    
    MuiFilledInput:{
      root:{
        "&:hover": {
          backgroundColor: '#5dc2a6',
       }
      }
    }
  },
});

function Signup({ classes, ...props }) {
  const dispatch = useDispatch();
  const initailState ={
    firstName: "",
    lastName: "",
    email: "",
    password: "", 
    mobileNo: "",
  }
  const [error, setError] = useState(initailState);  
  const [usersignup, setUsersignup] = useState(initailState);
  const resetForm = () =>{            
    setUsersignup(initailState);
  }
  const formValid = (userdata) =>{        
      let error_callback = false;
        let errors ={};        
        if(!userdata.firstName.trim()){
          error_callback=true;
          errors.firstName ="First Name Required *";          
        }
        if(!userdata.lastName.trim()){
          error_callback=true;
          errors.lastName ="Last Name Required *";          
        }
        if(!userdata.email.trim()){
          error_callback=true;
          errors.email ="Email Required *";          
        }else if(userdata.email){
          if (/\S+@\S+\.\S+/.test(userdata.email))
            {
              error_callback=false;                
            }else{
              error_callback = true;
              errors.email ="Email is invalid *";          

            }
        }
        if(!userdata.password.trim()){
          error_callback=true;
          errors.password ="Password Required *";          
        }
        if(!userdata.mobileNo.trim()){
          error_callback=true;
          errors.mobileNo ="Mobile No Required *";          
        }else if(userdata.mobileNo){
          if(userdata.mobileNo.length < 10 || userdata.mobileNo.length > 10){
            let mob = /^[1-9]{1}[0-9]{9}$/;
            if(userdata.mobileNo.length < 10 || userdata.mobileNo.length > 10){
              if (mob.test(userdata.mobileNo) === false) {            
                error_callback=true;
                errors.mobileNo ="Please enter valid mobile number and must be 10 digits *";          
              }
            }else{
              if (mob.test(userdata.mobileNo) === false) {            
                error_callback=true;
                errors.mobileNo ="Please enter valid mobile number *";          
              }
            }
            
          }
          
        }else if(userdata.mobileNo.length < 10 || userdata.mobileNo.length > 10){
          error_callback=true;
          errors.mobileNo ="Mobile No must have 10 digits *";          
        }
        setError({...errors});        
        return error_callback;
  }
  const submitSignUp = () => {        
    const onResponse = (status,response) => {        
      if(status === 'success'){
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Success"
              content="User registered succesfully. Please Sign In" 
              scheme={Cinnamon.Crisp.SCHEME_BLUE}
              icon={<CheckCircleIcon />}
            />
          ),
        });
        resetForm();
      };if (status === 'error') {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Oops..."
              content={response}
              scheme={Cinnamon.Crisp.SCHEME_BLUE}
              icon={<CancelIcon />}
            />
          ),
        });
      }
    };          
    if(!formValid(usersignup)){
      setError(initailState);
      dispatch(signUp(usersignup, onResponse));    
    }    
  };
  return (
    <>
      <div className={classes.signupPage} >            
      {props.responseSign.loading_signup === 1 ? <Spinner display="block" /> :<Spinner display="none" />}
      <div className={classes.div}>
        <Grid container>
          <Grid item xs={12} lg={6} sm={12} md={12} className={classes.leftdiv}>
            <Typography
              variant="h4"
              align="center"
              style={{ marginBottom: "15px" }}
            >
              Hey,Take a Step Towards Us !
            </Typography>
            <Typography variant="body1" align="center">
              Make Your Thoughts Alive With Us
            </Typography>
            <img
              width="88%"
              height="90%"
              src={signin}
              style={{ marginLeft: "70px" }}
              alt='pranay-2'
            ></img>
          </Grid>
          <Grid className={classes.rightdiv} item xs={12} lg={6} md={12} sm={12}>
            <Paper className={classes.paper} maxWidth={1}>
              <div className={classes.paperdiv}>
                <Typography variant="h3">Sign Up</Typography>
                <Typography variant="body1">
                  Welcoming you and your thoughts
                </Typography>
                <div>
                <form noValidate autoComplete="off" className={classes.form}>
                  <TextField
                    id="standard-basic"
                    label="First Name"                                          
                    {...(error.firstName !=='' && error.firstName !== undefined?({error:true}):(''))}                                                                  
                    className={classes.textinput}
                    value={usersignup.firstName}                    
                    onChange={(e) => {
                      setUsersignup({
                        ...usersignup,
                        firstName: e.target.value,
                      });
                      setError({...error,firstName:''})
                    }}
                    
                    helperText={error.firstName}
                  ></TextField>
                  <TextField
                    id="standard-basic"
                    label="Last Name"
                    {...(error.lastName !=='' && error.lastName !== undefined?({error:true}):(''))}    
                    value={usersignup.lastName}
                    onChange={(e) => {
                      setUsersignup({
                        ...usersignup,
                        lastName: e.target.value,
                      });
                      setError({...error,lastName:''})
                    }}
                    helperText={error.lastName}
                  ></TextField>
                  <TextField
                    id="standard-basic"
                    {...(error.email !=='' && error.email !== undefined?({error:true}):(''))}    
                    label="Email Address"
                    value={usersignup.email}
                    onChange={(e) => {
                      setUsersignup({ ...usersignup, email: e.target.value });
                      setError({...error,email:''})
                    }}
                    helperText={error.email}
                  ></TextField>
                  <TextField
                    id="standard-password-input"
                    label="Password"     
                    {...(error.password !=='' && error.password !== undefined?({error:true}):(''))}                  
                    type="password"
                    value = {usersignup.password}
                    onChange={(e) => {
                      setUsersignup({
                        ...usersignup,
                        password: e.target.value,
                        
                      });
                      setError({...error,password:''})
                    }}
                    autoComplete="current-password"
                    helperText={error.password}
                  />                  
                  <TextField
                    id="standard-basic"
                    {...(error.mobileNo !=='' && error.mobileNo !== undefined?({error:true}):(''))}    
                    label="Mobile No."
                    value = {usersignup.mobileNo}
                    onChange={(e) => {
                      setUsersignup({
                        ...usersignup,
                        mobileNo: e.target.value,
                      });
                      setError({...error,mobileNo:''})
                    }}
                    helperText={error.mobileNo}
                  ></TextField>
                  <div>
                    <Button variant="outlined" className={classes.signupBtn} onClick={submitSignUp} >
                      Sign Up
                    </Button>                                                
                  </div>
                </form>
              </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer />
      </div>
    </>
  );
}


const mapStateToProps = (state) => ({
  responseSign: state.signUp,
});

export default connect(mapStateToProps)(withStyles(styles)(Signup));
