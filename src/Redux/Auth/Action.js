import { SIGN_IN, SIGN_UP } from "./ActionType";

export const signinAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("https://snapstory-backend-production.up.railway.app/signing",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic "+btoa(data.email + ":" +data.password),
            }
        });
        const token = res.headers.get("Authorization");
        localStorage.setItem("token", token);
        dispatch({type:SIGN_IN, payload:token});
    } catch (error) {
        console.log("catch error: ", error);
    }
}

export const signupAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("https://snapstory-backend-production.up.railway.app/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        });
        const user = await res.json();
        dispatch({type:SIGN_UP, payload:user});
    } catch (error) {
        console.log("catch error: ", error);
    }
}
