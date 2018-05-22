import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST }  from '../_constants'

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE }  from '../_constants'

import { userLogin, userRegister } from '../_services';

export function login(email, password) {

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

export function register(user) {

    return dispatch => {

        //Disparando spinner
        dispatch(request(user));

        userRegister(user)
            .then(
                res => dispatch(success(res)),
                error => dispatch(failure(error))
            );
    }

    function request(user)  { return { type: REGISTER_REQUEST, user  } }
    function success(user)  { return { type: REGISTER_SUCCESS, user  } }
    function failure(error) { return { type: REGISTER_FAILURE, error } }

}
