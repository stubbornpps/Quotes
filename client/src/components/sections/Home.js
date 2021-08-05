import React from 'react';
import Footer from '../Footer/Footer.js';
import Fsection from './Fsection.js';
import { withStyles } from '@material-ui/core';


const styles= theme =>({
    root:{
        height:"88vh",
        width:"100%"
    }
})



function Home({classes,...props}) {
    return (
        <div className={classes.root}>            
            <Fsection />    
            <Footer />
        </div>
    )
}

export default (withStyles(styles)( Home))
