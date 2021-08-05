import nodemailer from 'nodemailer';
import env from 'dotenv';
let transporter = nodemailer.createTransport({    
        service: 'gmail',
        auth: {        
          // user: process.env.MAIL_USERNAME,
          // pass: process.env.MAIL_PASSWORD,
          user: "evincedevapi@gmail.com",
          pass: "Evince@dev12!",        
        }      
});

export default transporter;