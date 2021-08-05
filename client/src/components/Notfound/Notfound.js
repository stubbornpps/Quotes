import React from 'react';
import notfound from '../../images/notfound.png';
import {  Link} from "react-router-dom";
import {
    Grid,
    CssBaseline,
    Container,
    withStyles,    
    Button,    
}from "@material-ui/core";
const styles = theme =>({
    mcontainer:{
        minHeight:'92vh',
        minWidth:'100vw',        
    },
    gcontainer:{
        minWidth:'100%',
        height:'90vh',        
        paddingTop:'60px',
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        textAlign:'center'               
    },
    Hbtn:{
        background:'#0070ff',
        color:'white',
        padding:'10px 62px',
        border:"none",
        border:'2px solid #0070ff',
        marginTop:'20px',
        '&:hover':{
            color:'#0070ff'
        }
    }
}) ;
function Notfound({classes,...props}) {
    return (
        <>
            <Container className={classes.mcontainer}>
                <Grid container className={classes.gcontainer}  >
                    <CssBaseline />
                    <Grid item lg={12} md={12} sm={12} style={{height:'300px',textAlign:'center'}}>
                        <img src={notfound} style={{width:'60%',height:'100%'}} alt="Not Found"></img>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12}>
                        <h1>Page Not Found !</h1>
                        <Link to='/'  style={{textDecoration:'none'}} >
                    <Button   variant="outlined" className={classes.Hbtn} >
                        Home 
                    </Button> 
                    </Link>   
                    </Grid>                    
                </Grid>
            </Container>
        </>
    )
}

export default withStyles(styles)(Notfound)
