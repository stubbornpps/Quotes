import express from 'express';
import {requireSignin} from '../middleware/middleware.js';
import  User from '../model/signup.js';
import Quote from '../model/quote.js';
let router = express.Router();
router.post('/dashboard',requireSignin,(req,res)=>{
    User.findById({_id:req.body._id}).exec((err,user)=>{
        if(err) return res.status(400).json({message:err});
        if(user){
            const {image,full_name,email}  = user;
            let dashboard = { profile_user : {image,full_name,email}}
            User.find({},{hash_password:0,mobileNo:0}).exec((err,alluser)=>{
                if(err) return res.status(400).json({message:err});
                if(alluser){                    
                    Quote.find({}).populate('user_id','firstName lastName').exec((err,allQuote)=>{
                        if(err) return res.status(400).json({message:err});
                        if(allQuote){                            
                            const all_Quote = allQuote;
                            res.json({  all_user : alluser ,user: {...dashboard },quotes:all_Quote});                    
                        }
                    });                    
                }
            })                        
        }
    })
});

router.post('/addquote',requireSignin,(req,res)=>{
        const {
            quote_note,
            user_id
        }  = req.body;    
        const add_quote = new Quote({
            quote_note,
            user_id
        });
        add_quote.save((error,quote_data)=>{
            if(error) return res.status(400).json({message:error});
            if(quote_data){
                res.json({message:'Quote Added Successfully !'});
            }
        }); 
});

router.post('/getquotes',requireSignin,(req,res)=>{        
    Quote.find({user_id:req.body._id}).sort({updatedAt:-1}).exec(function(error,user_quotes)    {
        if(error) return res.status(400).json({message:error});
        if(user_quotes){
            res.status(200).json({user_quotes:user_quotes});
        }
    });
});

router.post('/editquote',requireSignin,(req,res)=>{
    let updatedQuote ={
        quote_note:req.body.quote_note,               
    }
    Quote.findByIdAndUpdate({_id:req.body.quote_id,user_id:req.body.user_id},{$set:updatedQuote},{new:true},(error,update_quote)=>{
        if(error) return res.status(400).json({message:error});
        if(update_quote){
            res.status(200).json({message:'Quote Updated Successfully !'});   
        }
    });
});
router.post('/deletequote',requireSignin,(req,res)=>{
    Quote.findByIdAndDelete({_id:req.body._id}).exec((error,delete_quotes)=>{
        if(error) return res.status(400).json({message:error});
        if(delete_quotes){
            res.status(200).json({delete:delete_quotes});   
        }
    });
});
router.post('/quotesbyid',requireSignin,(req,res)=>{
    Quote.findById({_id:req.body._id}).exec((error,get_quotesid)=>{
        if(error) return res.status(400).json({message:error});
        if(get_quotesid){
            res.status(200).json({get_quotesid});   
        }
    })
});

export default router;