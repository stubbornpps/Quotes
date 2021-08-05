import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
 
let quote = new mongoose.Schema({
    quote_note:{
        type:String,
        required:true,
        min:3,
        max:300
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:'User'        
    },        
},{timestamps:true});

export default mongoose.model('Quote',quote);