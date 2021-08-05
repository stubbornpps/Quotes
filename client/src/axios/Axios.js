import axios from 'axios';


const instance = axios.create({
    baseURL:"https://atom-quotes.herokuapp.com/"
});

export default instance;