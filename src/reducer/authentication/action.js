/**
 * Created by thanhqhc on 3/28/17.
 */
import axiosev from '../../axiosev';
import {HOME_URL} from '../../constants';

// export const SIGN_UP_SUPPLIER = 'SIGN_UP_SUPPLIER';
export const SIGN_IN_SUPPLIER = 'SIGN_IN_SUPPLIER';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_SUPPLIER_ID = 'SET_SUPPLIER_ID';
export const SET_AUTHENTICATE_FAILURE = 'SET_AUTHENTICATE_FAILURE';
export const SET_SIGN_OUT = "SET_SIGN_OUT";

export function signOut() {
    return dispatch => {
        axiosev.post('/suppliers/signOut')
        .then(response => {
            dispatch(setSignOut());
        });
    }
}

export function checkSignIn() {
  return dispatch => {
    
    axiosev.get('/suppliers/me').then(response => {
        var data = response.data;
        if (data.code === 200) {
            data = data.data;

            var access_token = data.access_token;
            var supplier_id = data.supplier_id;
            dispatch(setAccessToken(access_token));
            dispatch(setSupplierID(supplier_id));
        } else {
            dispatch(setAuthenticateFailure(data.error));
        }
    }).catch(error => {
        dispatch(setAuthenticateFailure(error));
    });
  };
};

function setSignOut() {
    window.location.href = HOME_URL;
    return {
        type: SET_SIGN_OUT,
    }
}

export function signIn(username, password) {
    return dispatch => {
        axiosev.post('/suppliers/signIn',{
            'username': username,
            'password': password
        }).then(response => {

            var data = response.data;

            if (data.code === 200) {
                data = data.data;

                var access_token = data.access_token;
                var supplier_id = data.supplier_id;
                dispatch(setAccessToken(access_token));
                dispatch(setSupplierID(supplier_id));
            } else {
                dispatch(setAuthenticateFailure(data.error));
            }

        }).catch(error => {

            dispatch(setAuthenticateFailure(error));
        });
    };
};

export function setAccessToken(access_token) {
    return {
        type: SET_ACCESS_TOKEN,
        access_token
    }
}

export function setSupplierID(supplier_id) {
    return  {
        type:SET_SUPPLIER_ID,
        supplier_id
    }
}

export function setAuthenticateFailure(error) {

    var errorT = "Đăng nhập thất bại vui lòng thử lại";
    if (error.response.data) {
        errorT = error.response.data.error;
    }
    // window.location.href = HOME_URL;
    return {
        type: SET_AUTHENTICATE_FAILURE,
        error: errorT
    }
}
