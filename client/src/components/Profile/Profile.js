import React,{useState,useEffect, useRef} from 'react';
import {Grid,Paper,CssBaseline,Container,withStyles,Typography,Button,InputBase,}from "@material-ui/core";
import CameraIcon from '@material-ui/icons/Camera';
import { useDispatch, connect } from "react-redux";
import {profileData,profileUpdate} from '../../actions/Profile';
import ButterToast, { Cinnamon} from "butter-toast";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { removeToken } from '../../middleware/middleware';
import ProfileImg from '../../images/profile.png';
const styles = (theme)=>({
    profilePage:{
        minWidth:'95vW',
        minHeight :'94vH',
        background:'#0070ff'
    },
    profileImagePaper:{
        width:'200px',
        height:'200px',
        borderRadius:'50%',
        textAlign:'center',
        padding:'2px',
        position:'relative'
    },
    profileImage:{
        width:'100%',
        height:'100%',
        borderRadius:'50%',
    },    
    gridContainer:{
        paddingTop:'20px',        
    },
    gridForm:{
        background:'white',
        width:'50%',
        height:'100%',
        borderRadius:'8px',
        padding:'15px',       
    },
    paperForm:{
        minWidth:'100%',
        display:'flex',
        flexDirection:'column',
        alignItem:'space-around',
        justifyContent:'center',        
        background:'white',
        borderRadius:'5px',
        padding:'15px'
    },
    grid2:{
        display:'flex',justifyContent:'center',alignItem:'center',
    },
    grid1:{
        display:'flex',justifyContent:'center',alignItem:'center',textAlign:'center',width:'100% '
    },    
    inputClasses:{
        display:'block',
        background:'#8080802e',
        padding:'8px',
        borderRadius:'2px solid black !important',
        marginBottom:'12px'
    },
    saveBtn:{
        '&:hover':{
            backgroundColor:"#0070ff",            
            color:'white'       
        },
        padding:'8px',
        letterSpacing:'1px',
        fontSize:'16px',
        fontweight:'600',
        marginTop:'10px',
        backgroundColor:'white',
        color:'#0070ff'       
    },
    imgBtn:{
        position:'absolute',
        top:'83%',
        left:'65%',
        background:'white',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        '&:hover':{
            cursor:'pointer',
            color:'#0070ff'
        }
    }
})
function Profile({classes,...props}) {       
    let [userData,setUserData]  = useState({
        firstName:'',
        lastName:'',
        email:'',
        image:'',
        mobileNo:''
    });
    const inputFile = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileData());
    }, []) ;  
    useEffect(() => {
        if(props.checkerData.login_check_error === 1){
            removeToken();            
            props.history.push('/login');                   
        }    
        if(props.profileData.error === 1){            
            ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Error"
                    content={props.profileData.err_msg.message}
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<CancelIcon />}
                  />
                ),
              });
        }
        if(props.profileData.user !== undefined && props.profileData.user !== '' ){                        
            setUserData({...props.profileData.user.user_data});            
        }
        if(props.profileData.update_success !== undefined && props.profileData.update_success === 1 ){     
            dispatch(profileData());                   
            ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success"
                    content="Profile Updated Successfully !" 
                    scheme={Cinnamon.Crisp.SCHEME_BLUE}
                    icon={<CheckCircleIcon />}
                  />
                ),
              });
        }
    }, [props.checkerData.login_check_error,props.profileData.user,props.profileData.update_success,props.profileData.error]) ;
    const imageChange = () =>{
        inputFile.current.click();
    };
    const updateProfile = () =>{                        
        dispatch(profileUpdate(userData)) ;        
    }

    return (
        <div className={classes.profilePage}>
            <CssBaseline />
            <Container>
                <Grid container spacing={3} className={classes.gridContainer}>                    
                    <Grid item lg={12}  className ={classes.grid1}>
                        <Typography variant="h4" style={{color:'White'}}>Profile</Typography>
                    </Grid>
                    <Grid item lg={12} className ={classes.grid1} >
                        <Paper className={classes.profileImagePaper}>
                            <img  src={userData.image !==''? userData.image : ProfileImg} className={classes.profileImage} alt="profileImage" />                            
                            <input type="file" id="file" ref={inputFile} style={{display: "none"}} accept="image/*" onChange = {(e)=>{
                                setUserData({
                                    ...userData,
                                    image:e.target.files[0]
                                })
                            }}  />
                            <div className={classes.imgBtn} onClick={imageChange} ><CameraIcon /></div>
                        </Paper>
                    </Grid>
                    <Grid item lg={3} xs={false} md={3} >                                                                                                                       
                    </Grid>         
                    <Grid item lg={6} xs={12} md={6} className ={classes.grid2} >                                                   
                            <form className={classes.paperForm} >
                                <div className={classes.formGroup}>
                                    <div>
                                    <Typography variant='subtitle1' gutterBottom>First Name</Typography>
                                    <InputBase type='text' placeholder="Enter Your First Name" className={classes.inputClasses} value={userData.firstName || ''}
                                            onChange={(e)=>{
                                                setUserData({
                                                    ...userData,
                                                    firstName:e.target.value
                                                })                                                
                                            }}                                        
                                    />                                    
                                    </div>
                                    <div>
                                    <Typography variant='subtitle1' gutterBottom>Last Name</Typography>
                                    <InputBase type='text' placeholder="Enter Your Last Name" className={classes.inputClasses} value={userData.lastName || ''}
                                    onChange={(e)=>{
                                        setUserData({
                                            ...userData,
                                            lastName:e.target.value
                                        })                                                
                                    }}
                                     />                                    
                                    </div>
                                </div>                                
                                <div className={classes.formGroup1}>                                    
                                    <div>
                                    <Typography variant='subtitle1' gutterBottom>Email Address</Typography>
                                    <InputBase type='text' placeholder="Enter Your Email Address" className={classes.inputClasses} value={userData.email || ''}  disabled />                                                                                                            
                                    </div>
                                </div>                                                                
                                <div className={classes.formGroup1}>                                    
                                    <div>
                                    <Typography variant='subtitle1' gutterBottom>Mobile Number</Typography>
                                    <InputBase type='text' placeholder="Enter Your Mobile Number" className={classes.inputClasses} value={userData.mobileNo || ''}
                                    onChange={(e)=>{
                                        setUserData({
                                            ...userData,
                                            mobileNo:e.target.value
                                        })                                                
                                    }}
                                     />                                                                                                            
                                     <InputBase type='hidden' value={userData._id || ''} />                                                                                                            
                                    </div>
                                </div>                                                            
                                <Button variant="contained" color="primary" className={classes.saveBtn} onClick={updateProfile}>
                                  Update Profile
                                </Button>
                            </form>                                              
                    </Grid>         
                    <Grid item lg={3} xs={false} md={3} >                                                                           
                    </Grid>             
                </Grid>
            </Container>            
        </div>
    )
}

const mapStateToProps = (state) => ({    
    profileData: state.profileData,    
    checkerData: state.checkerData,    
  });
  
export default connect(mapStateToProps)(withStyles(styles)(Profile))
