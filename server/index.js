import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv';
import * as path from 'path';
import bodyParser from 'body-parser';
import signup from './src/controller/signup.js';
import profile from './src/controller/profile.js';
import dashboard from './src/controller/dashboard.js';


const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({   
    extended: true
  })); 
env.config();



//database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ejuxc.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`db connected`);
});
const __dirname = path.dirname(''); 
app.use(express.static(path.join(__dirname, 'images')));  
//router
app.use('/',signup);
app.use('/',profile);
app.use('/',dashboard);


//listen
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

