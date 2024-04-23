import axios from 'axios';
import { authHeader } from '../utils/AuthHeader';
import { SET_AUTHNETICATION, SET_BUTTON_LOADING, SET_USER } from './MainReducer';

export const Login = (user, pass) => {
    return async (dispatch) => {
        dispatch(SetButtonLoading(true));
        let result = await axios.post(`api/user`, {
            user: user,
            password: pass
        });
        if(result.data.success)
        {
            sessionStorage.user = user;
            sessionStorage.setItem('token', result.data.token);
            axios.defaults.headers.common = authHeader();
            dispatch(SetAuthentication(true));
            dispatch(SetUser(user));
        }
        dispatch(SetButtonLoading(false));
    }
}

export const LoginToken = () => {
    return async (dispatch) => {
        dispatch(SetButtonLoading(true));
        let token = sessionStorage.getItem('token');
        if(token) {
            axios.defaults.headers.common = authHeader();
            try {
                let result = await axios.get(`api/user/loginToken`);
                if(result.data.success)
                {
                    dispatch(SetAuthentication(true));
                    dispatch(SetUser(result.data.user));
                }
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(SetButtonLoading(false));
    }
}

export const SetAuthentication = (authentication) => {
    return (dispatch) => {
        dispatch({ type: SET_AUTHNETICATION, authentication });
    }
}

export const SetButtonLoading = (loading) => {
    return (dispatch) => {
        dispatch({ type: SET_BUTTON_LOADING, loading });
    }
}

export const SetUser = (user) => {
    return (dispatch) => {
        dispatch({type: SET_USER, user });
    }
}