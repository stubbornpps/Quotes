import { Button, Grid , Typography, withStyles } from '@material-ui/core';
import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import main from '../../images/group.png';
import { Link } from "react-router-dom";

const styles = theme=>({
        img:{
            margin:theme.spacing(0)
        },  
        root:{
            overflowY:'auto',
            height:'100%'
        },        
        maindiv:{
            width:'90%',
            height:'90%',
            // background:"orange",
            padding:'20px',                 
            textAlign:'left',
        },
        textCenter:{
            marginTop:'200px', marginLeft:'25px'           
        },
        textin:{            
            marginTop:'20px',
            marginLeft:'25px',            
        },
        textin_btn:{
            marginTop:'20px',
            marginLeft:'25px',         
            color:'#0070ff',
            borderColor:'#0070ff'            
        }
})
function Fsection({classes,...props}) {
    return (
        <div className={classes.root}>
        <Grid container>
            <Grid item xs={12}  lg={6} >
            <div className={classes.maindiv}>
                <Typography variant="h2" className={`${classes.textCenter}`}>
                    Want to share your positive thoughts ?
                </Typography>
                <Typography variant="body1" className={`${classes.textin}`}>
                    We have a platform for you to share your thoughts here . 
                </Typography>
                <Link to='/signup' style={{textDecoration:'none'}}>
                <Button  variant="outlined" size="large"   className={`${classes.textin_btn}`} >
                    Get Started     <ArrowForwardIcon />
                </Button>
                </Link>
            </div>
            </Grid>
            <Grid  item xs={12} lg={6}>
            <img className={classes.img} width="86%" height="90%" src={main} alt='user_group' ></img>            
            </Grid>
        </Grid>
        </div>
    )
}

export default (withStyles(styles)(Fsection))
