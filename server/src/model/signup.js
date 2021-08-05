import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import env from 'dotenv';
env.config();
let signUp = new mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            min:3,
            max:30
        },
        lastName:{
            type:String,
            required:true,
            min:3,
            max:30
        },        
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        hash_password:{
            type:String,
            required:true
        },
        mobileNo:{
            type:String,            
        },
        image:{
            type:String,            
            default:process.env.URL_BASE+'profile/profile.png'
        },        
        resetPasswordToken: String,
        resetPasswordExpires: Date
        
},{timestamps:true});
signUp.set('toObject', { virtuals: true });
signUp.set('toJSON', { virtuals: true });
signUp.virtual('password').set(function(password){
    this.hash_password =bcrypt.hashSync(password,10);
});
signUp.virtual('full_name').get(function(){
    return this.firstName+' '+this.lastName;
});

signUp.methods = {
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password);
    },
    generatePasswordReset:function(){
        this.resetPasswordToken =crypto.randomBytes(20).toString('hex');
        this.resetPasswordExpires= Date.now()+ 3600000;
    }
}
export default mongoose.model('User',signUp);