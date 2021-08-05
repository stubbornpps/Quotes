import React from 'react';
import {Button , withStyles} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Quotes_delete} from '../../actions/Quotes';
import { useDispatch, connect } from "react-redux";

const styles = (theme) =>({        
    loginRBtn:{
        background:'#0070ff',
        color:'white',
        '&:hover':{
            background:'white',
            color:'#0070ff',
        }      
    }
})
function Log({classes,...props}) {  
    const dispatch = useDispatch();      
    const { open, setOpen , quote_id } = props             
    const handleClose = () =>{
        setOpen(false);
    }
    const deleteAction = () =>{
        dispatch(Quotes_delete(quote_id));        
    }
    return (
        <div>
        <Dialog   
        open={open}                  
        fullWidth={true}
        maxWidth={"xs"}         
        className={classes.deleteDialog}      
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>{"Delete"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{textAlign:'center',justifyContent:'center',marginBottom:'5px'}}>
                Are You Sure ?
            </DialogContentText>
            </DialogContent>
            <DialogActions style={{justifyContent:'center',marginBottom:'5px'}}>                        
            <Button className={classes.loginRBtn}  onClick={deleteAction} variant="contained" >
                Yes
            </Button>                                
            <Button className={classes.loginRBtn}  variant="contained" onClick={handleClose}>
                No  
            </Button>                                       
            </DialogActions>
        </Dialog>
        </div>
    )
}

const mapStateToProps_deleteQuote = (state) => ({    
    deletedQuotes : state.quoteData
});
export default connect(mapStateToProps_deleteQuote)(withStyles(styles)(Log));
