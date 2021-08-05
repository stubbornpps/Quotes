import jwt from 'jsonwebtoken';
import env from 'dotenv';

export const requireSignin = (req,res,next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
            if(err) return res.status(401).json({ message : err});
            else{
                req.user = decoded; 
                next();
            }        
        });
    }else{
        return res.status(401).json({ profile_error:'1' ,message : 'Authorization Required !'});
    }
    
}