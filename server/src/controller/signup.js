import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import transporter from '../mailer/mailer.js';
import  User from '../model/signup.js';
import env from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import handlebars from 'handlebars';
let router = express.Router();


const signUpFunction = (user,res) =>{    
    const {
        firstName,
        lastName,
        email,
        password,
        mobileNo
    }= user;
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        mobileNo
    });
    _user.save((error,user_data)=>{
        if(error) return res.status(400).json({message:error});
        if(user_data){
            const __dirname = path.resolve(path.dirname('')); 
            const filePath = path.join(__dirname,'/src/mailer/register.html');
            const source = fs.readFileSync(filePath, 'utf-8').toString();
            const template = handlebars.compile(source);
            const replacements = {
                email: user.email
              };
            const htmlToSend = template(replacements);
            let mailOptions = {
                from: process.env.MAIL_USERNAME,
                to: user.email,
                subject: 'Atom',                
                html: htmlToSend
              };
              transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
                    if(user.auth == 0 ){                        
                        return res.status(200).json({message:"User created successfully. Please Sign In !"})
                    }
                    if(user.auth == 1){
                        loginFunction(user_data,res);                        
                    }
                }
              });                
        }
    })
}


router.post('/signup',(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(user) return res.status(400).json({message:'User already registered ! Please sign in to continue !'});
        signUpFunction(req.body,res);        
    })    
});
const loginFunction = (user,res) =>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'60s'});
    const {_id,firstName,lastName,email,role , fullName} = user;
    res.status(200).json({
        token,
        user:{_id,firstName,lastName,email,role,fullName}
    });    
}
router.post('/login',(req,res)=>{    
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error) return res.status(400).json({message:error});
        if(user){
            if(req.body.auth == 0){
                if(user.authenticate(req.body.password)){
                    loginFunction(user,res);
                    }else{
                        res.status(401).json({error_code:'2', message:'Invalid Password' })
                    }
            }
            if(req.body.auth == 1){
                loginFunction(user,res);
            }            
        }else{
            if(req.body.auth == 0){
                res.status(404).json({error_code:'1',message:'User Not Found !'});    
            }
            if(req.body.auth == 1){
                signUpFunction(req.body,res);       
            }
        }
    });
    
});

router.post('/forgotpassword',(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error) return res.status(400).json({message:error});
        if(user){             
            user.generatePasswordReset();                    
            user.save((error,user_data)=>{
                let link = "http://localhost:3000/resetpassword/" + user_data.resetPasswordToken;                
                const __dirname = path.resolve(path.dirname('')); 
                const filePath = path.join(__dirname,'/src/mailer/resetpassword.html');
                const source = fs.readFileSync(filePath, 'utf-8').toString();
                const template = handlebars.compile(source);
                const replacements = {
                    email: user_data.email,
                    link:link
                  };
                const htmlToSend = template(replacements);
                let mailOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: user_data.email,
                    subject: 'Password Reset',                
                    html: htmlToSend
                };                
                  transporter.sendMail(mailOptions, function(err, data) {
                    if (err) {
                        console.log("Error " + err);
                    } else {                                                    
                        return res.status(200).json({error_code:'0',message:"Email Password Sent !"})                        
                    }
                  });               
            })                            
        }else{
            return res.status(404).json({error_code:'1',message:'User Not Found !'})
        }
    })    
})

router.get('/passwordreset/:token',(req,res)=>{
    User.findOne({resetPasswordToken:req.params.token , resetPasswordExpires:{$gt: Date.now() }}).exec((error,user)=>{
        if(error) return res.status(400).json({message:error});
        if(user){
            return res.status(200).json({error_code:'0',message:'user has token !!'})
        }else{
            return res.status(401).json({error_code:'1',message:'Password reset token is invalid or has expired !'})
        }
    });

});
router.post('/passwordreset/:token',(req,res)=>{
    User.findOne({resetPasswordToken:req.params.token , resetPasswordExpires:{$gt: Date.now() }}).exec((error,user)=>{
        if(error) return res.status(400).json({message:error});
        if(user){
                user.password = req.body.password;
                user.resetPasswordToken=undefined;
                user.resetPasswordExpires=undefined;
                user.save((err,user_save)=>{
                    if(error) return res.status(400).json({message:error});
                    const __dirname = path.resolve(path.dirname('')); 
                    const filePath = path.join(__dirname,'/src/mailer/passwordsaved.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    const template = handlebars.compile(source);
                    const replacements = {
                        email: user_save.email,                        
                    };
                    const htmlToSend = template(replacements);
                    let mailOptions = {
                        from: process.env.MAIL_USERNAME,
                        to: user_save.email,
                        subject: 'Password Saved',                
                        html: htmlToSend
                    };                    
                      transporter.sendMail(mailOptions, function(err, data) {
                        if (err) {
                          console.log("Error " + err);
                        } else {                                                        
                                return res.status(200).json({error_code:'0',message:"Password and email saved and sent !"})                        
                        }
                      });   
                })
        }else{
            return res.status(401).json({error_code:'1',message:'Password reset token is invalid or has expired !'})
        }
    })
})

export default router;