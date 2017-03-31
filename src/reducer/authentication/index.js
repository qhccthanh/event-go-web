import {
    SIGN_IN_SUPPLIER,
    SET_ACCESS_TOKEN,
    SET_SUPPLIER_ID,
    SET_AUTHENTICATE_FAILURE
} from './action';

const initialState = {
    access_token: "",
    supplier_id: "",
    autheticating: false,
    error: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return Object.assign({},state, {
                autheticating: false,
                access_token: action.access_token
            });
        case SIGN_IN_SUPPLIER:
            return Object.assign({},state, {
               autheticating: true
            });
        case SET_SUPPLIER_ID:
            return Object.assign({},state, {
                supplier_id: action.supplier_id,
            });
        case SET_AUTHENTICATE_FAILURE:
            return Object.assign({},state, {
                access_token: "",
                supplier_id: "",
                autheticating: false,
                error: action.error,
            });
        default:
            return state;
    }
};
