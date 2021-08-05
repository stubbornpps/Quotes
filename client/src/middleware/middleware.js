export const setToken = (token,email,id) =>{
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('id', id);
}
export const setLoggedUser = (logged_obj)=>{
    localStorage.setItem('loggedUser',JSON.stringify(logged_obj));
}
export const getLoggedUser = (logged_obj)=>{
    if(localStorage.getItem('loggedUser') !== null){
        return localStorage.getItem('loggedUser');
    }
    return null;

}

export const getToken=()=>{
    if(localStorage.getItem('token') !== null) {
        return localStorage['token'];
     }
     return null ;         
}
export const removeToken = () =>{
    if(localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('loggedUser');
     }
}

export const getIdToken = () =>{
    if(localStorage.getItem('id') !== null && localStorage.getItem('token') !== null) {
        let localStore = {
            token:localStorage['token'],
            id:localStorage['id']
        }
        return localStore;
     }   
     return null;
}

