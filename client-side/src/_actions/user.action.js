import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST }  from '../_constants'
import { userLogin } from '../_services';

export function login(email, password) {

    let data = JSON.stringify({
        email: email,
        password: password
    });
 
    return dispatch => {
        
        dispatch(request({ email }));

        userLogin(email, password)
        .then(token => dispatch(success(token)))
        .catch(err =>  dispatch(failure(err)));

    }

    function request(user)  { return { type: LOGIN_REQUEST, user  } };
    function success(token) { return { type: LOGIN_SUCCESS, token } };
    function failure(err)   { return { type: LOGIN_FAILURE, err   } };

}