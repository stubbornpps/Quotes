import React from 'react';
import { Typography , withStyles, CssBaseline } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
const styles = theme =>({
        footer:{
            position:'fixed',
            width:"100%",
            bottom:"0",
            left:'0',
            textAlign:'center',
            padding:'4px',  
            display:'flex',
            justifyContent:'center',
            alignItem:'center'
        },
        innerfooter:{
            // background:'red',
            width:'50%',
            height:'50%',
            position:'relative',
        },
        heart:{
            color:'red',
            width:'20px',
            height:'20px',            
            fontSize:'15px', 
            position:'relative',
            top:'5px',
            left:'0%'
        },
        footertext:{            
            fontSize:'15px',   
        }
})
function Footer({classes,...props}) {
    return (
        <footer className={classes.footer} >
            <CssBaseline />
            <div className={classes.innerfooter}>
            <Typography variant="h6" className={classes.footertext}>
                Made with   <FavoriteIcon className={classes.heart}  />    by Pranay
            </Typography>
            </div>
        </footer>
    )
}

export default (withStyles(styles)(Footer))
