import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST }  from '../_constants'
import { userLogin } from '../_services';

export function login(email, password) {
    
    return dispatch => {
        
        dispatch(request({ email }));

        userLogin(email, password);
    
    
    
    }

    function request(user)  { return { type: LOGIN_REQUEST, user  } };
    function success(user)  { return { type: LOGIN_SUCCESS, user  } };
    function failure(error) { return { type: LOGIN_FAILURE, error } };
}