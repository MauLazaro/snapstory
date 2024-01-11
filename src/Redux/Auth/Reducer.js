import { LOG_OUT, SIGN_IN, SIGN_UP } from "./ActionType"

const initialValue = {
    signup:null,
    signin:null,
    logout:null,
}
export const AuthReducer = (store=initialValue, {type, payload}) => {
    if (type===SIGN_IN) {
        return {...store, signin:payload}
    } else if (type===SIGN_UP) {
        return {...store, signup:payload}
    } else if (type===LOG_OUT) {
        return {...store, logout:payload}
    }

    return store;
}