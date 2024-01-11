import { ALL_POST, CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";

const BASE_URL = "https://snapstory-backend-production.up.railway.app/api";

export const createPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/create`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
            body: JSON.stringify(data.data),
        });
        const post = await res.json();
        dispatch({type:CREATE_NEW_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const findUserPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/following/${data.userIds}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const posts = await res.json();
        dispatch({type:GET_USER_POST, payload:posts});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const reqUserPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/following/${data.userId}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const posts = await res.json();
        dispatch({type:REQ_USER_POST, payload:posts});
    } catch (error) {
        const posts = [];
        console.log("catch error: ",error);
        dispatch({type:REQ_USER_POST, payload:posts});        
    }
}

export const likePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/like/${data.postId}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const post = await res.json();
        dispatch({type:LIKE_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const unlikePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/unlike/${data.postId}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const post = await res.json();
        dispatch({type:UNLIKE_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const savePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/save_post/${data.postId}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const post = await res.json();
        dispatch({type:SAVE_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const unsavePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/unsaved_post/${data.postId}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const post = await res.json();
        dispatch({type:UNSAVE_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const findPostByIdAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/${data.postId}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const post = await res.json();
        dispatch({type:GET_SINGLE_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const deletePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/delete/${data.postId}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+data.jwt
            },
        });
        const post = await res.json();
        dispatch({type:DELETE_POST, payload:post});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}

export const findAllPostAction = (jwt) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/posts/all`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+jwt
            },
        });
        const posts = await res.json();
        dispatch({type:ALL_POST, payload:posts});
    } catch (error) {
        console.log("catch error: ",error);        
    }
}