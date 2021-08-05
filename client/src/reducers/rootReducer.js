import {combineReducers} from 'redux';
import {signUp} from '../reducers/sign.js';
import {Login} from '../reducers/Login.js';
import {resetPassword} from '../reducers/ResetPassword.js';
import {profileData} from '../reducers/Profile';
import {checkerData} from '../reducers/Checker';
import {dashData} from '../reducers/Dashboard';
import {quoteData} from '../reducers/Quotes';

export default combineReducers({
    signUp,
    Login, 
    resetPassword,
    profileData ,
    checkerData ,
    dashData,
    quoteData
});
