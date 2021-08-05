import express from 'express';
import User from '../model/signup.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import * as path from 'path';
import {requireSignin} from '../middleware/middleware.js';
let router = express.Router();

router.post('/profile',requireSignin,(req,res)=>{
    User.findOne({_id:req.body.id}).exec((error,user_data)=>{
        if(error) return res.status(400).json({message:error});
        if(user_data){
            res.status(200).json({user_data});
        }
    })    
});
let profileImage =  multer.diskStorage({
    destination:function(req,file,cb){        
        const __dirname = path.resolve(path.dirname('')); 
        const profilePath = path.join(__dirname,'/images/profile');        
        cb(null,profilePath);
    },
    filename: function (req, file, cb) {              
        cb(null, file.originalname);
    } 
});
let profileUpload = multer({ storage: profileImage,limits: {fileSize: 100 * 1024 * 1024 }});
let pic_upload = profileUpload.single('image');
router.post('/saveProfile',requireSignin,(req,res)=>{        
    pic_upload(req,res,(err)=>{
        if(err){
        if(err.code=='LIMIT_FILE_SIZE'){
            res.status(500).json({file_error_code:'1',message:'File Size is too large. Allowed file size is 100KB'});
        }
    }else{
        var image_option ;
            if(!req.file){                 
                // return res.status(500).json({error_code:'1',message:'File not found'});
                 image_option = req.body.image ; 
            }else{
                image_option = 'http://'+req.headers.host+'/profile/'+req.file.originalname;
            }            
            const updateProfile = ({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,    
                mobileNo:req.body.mobileNo,
                image:image_option
            })
            User.findByIdAndUpdate({_id:req.body._id},{$set:updateProfile},{new:true},(err,updated_user)=>{
                if(err) return res.status(400).json({message:err});
                if(updated_user){
                    res.status(200).json({error_code:'0' ,message:updated_user})
                }
            })
        }        
    });
    
})

export default router;