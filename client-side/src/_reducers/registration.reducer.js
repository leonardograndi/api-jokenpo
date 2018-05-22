import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE }  from '../_constants'


export default function registration(state = {}, action) {

    switch(action.type) {

        case REGISTER_REQUEST:
            return { registering: true };
        case REGISTER_SUCCESS:
            return {...state, result: true };
        case REGISTER_FAILURE: 
            return {...state, result: false };
        default:
            return state;
    }

};