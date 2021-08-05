import React from 'react';
import { AppBar, Typography , withStyles, Box, Button } from '@material-ui/core';
import {  Link, useLocation } from "react-router-dom";
import Atom from '../../images/atom.png';
import {removeToken , getToken } from '../../middleware/middleware';
import { useDispatch } from "react-redux";
import {Logoutaction} from '../../actions/Login';
const styles = theme =>({ 
    navbar:{
      fontFamily: 'Noto Sans JP',
      background:'#0070ff',
      padding:'8px',
      color:"white",      
    },
    header:{    
      margin: theme.spacing(1),
      color:'white',      
    },
    buttonLog:{
        width:'100px',
        height:'35px',
        color:'white',
        borderColor:'white',        
        marginRight:'12px',      
        textDecoration:'none'  
    },
    title:{
        fontSize:'30px',
        marginLeft:'25px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    bicon:{
        width:'28px',
        height:'26px',
        marginRight:'2px'
    }
  })

function Header({classes,...props}) {
    const dispatch = useDispatch();    
    const logOut = ()=>{
        removeToken();
        dispatch(Logoutaction());
    }    
    const buttonDash =(pathname)=>{
        if((pathname==="/" || pathname=== "/profile" || pathname=== "/view" || pathname=== "/add" ) && getToken() !== null ){
            return(<Link  to='/dashboard' style={{textDecoration:'none'}}>
            <Button  className={classes.buttonLog}  variant="outlined" >
                Dashboard
            </Button>                    
            </Link>)
        }
    }
        const buttonVariation = (pathname) =>{                
            
                if(getToken() === null && pathname==="/login" ){
                    return(<Link  to='/signup' style={{textDecoration:'none'}}>
                    <Button  className={classes.buttonLog}  variant="outlined" >
                    Sign Up
                    </Button>                    
                    </Link>)
                }
                if(getToken() === null ){                
                    if(pathname === '/signup' || pathname==='/'){
                        return(<Link  to='/login' style={{textDecoration:'none'}}>
                    <Button className={classes.buttonLog}  variant="outlined" >
                        Login
                    </Button>                    
                    </Link>)
                    }                    
                }
                if(getToken() != null  ){
                    if( pathname === '/dashboard' || pathname === '/' || pathname === '/profile' || pathname === '/view'  || pathname === '/add'){
                        return(<Link  to='/login' style={{textDecoration:'none'}}>
                    <Button className={classes.buttonLog}  variant="outlined" onClick ={logOut} >
                        Log Out
                    </Button>                    
                    </Link>)
                    }
                    
                }
        }
    const location = useLocation();
    return (
        <>
        <AppBar position="static" color="inherit" className={classes.navbar} >        
            <Box display="flex" alignItems="center">
            <Box width="100%" display="flex"  alignItems="center" >            
            <Typography variant="h5" className={classes.title}>
                <Link to='/' style={{textDecoration:'none',color:'white'}}>
                    <img className={classes.bicon} src={Atom} alt="Brand Logo" />
                    Atom
                </Link>                
            </Typography>
            </Box>
            {buttonDash(location.pathname)}
            <Box>
                {buttonVariation(location.pathname)}
            </Box>
            </Box>                        
        </AppBar>       
        </>
    )
}

export default (withStyles(styles)(Header)) 
