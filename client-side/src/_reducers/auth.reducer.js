import { LOGIN_SUCCESS, LOGIN_FAILURE }  from '../_constants'


const initialState = {
    token: localStorage.getItem('token'),
    error: null
};

export default function authentication(state = initialState, action) {

    switch(action.type) {

        case LOGIN_SUCCESS:
            return {
                ...state, token: action.token, user: action.user
            };
        case LOGIN_FAILURE:
            return {
                ...state, error: action.error
            };
        default:
            return state;
    }

};