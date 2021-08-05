import React from 'react';
import { withStyles } from "@material-ui/core";  
import Spinner_loader from '../../images/spinner.gif';


const style = (theme) =>({
    spinnerDiv:{
        zIndex:'12000000',
        position:'fixed',
        width:'100%',
        height:'100%',        
    },
    spinnerImg:{
        width:'50px',
        height:'50px',
        position:'absolute',
        left:'48%',
        top:'38%',
        transform:'translate(-50%,-50%)',           
        zIndex:'1000',
        boxShadow:'10px 0 5px 1000px #ffffff36'
    }
});


function Spinner({classes,...props}) {    
    return (
        <div className={classes.spinnerDiv} style={{display:props.display}}>
            <img src={Spinner_loader} className={classes.spinnerImg} alt="Loader" />
        </div>
    )
}

export default withStyles(style)(Spinner)
