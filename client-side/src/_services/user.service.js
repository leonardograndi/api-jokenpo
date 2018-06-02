import axios from 'axios';
import { API } from '../_constants'

export const userLogin = (email, password) => {
    
    let data = JSON.stringify({
        email: email,
        password: password
    });

    return axios.post(API + 'user/auth', data, {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {

        if (res.data.user && res.data.token) {
            localStorage.setItem('token', JSON.stringify(res.data.token));   
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            console.log(data, "DATA");

            return res.data;
        }
        
    }).catch(err => {
        localStorage.clear();
    });

}


export const userRegister = (user) => {

    let data = JSON.stringify(user);

    return axios.post(API + 'user/', data, {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
    
        return res.data;           
         
    }).catch(err => {
        localStorage.clear();
        return err;
    });
}