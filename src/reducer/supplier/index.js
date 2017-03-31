import {
    SET_SUPPLIER,
    GET_SUPPLIER,
    SIGN_IN_SUPPLIER,
    GET_ACCESS_TOKEN,
    SET_ACCESS_TOKEN
  } from './action';

const initialState = {
  supplier: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPPLIER:
      return Object.assign({},state, {
        supplier: action.supplier
      });
    default:
      return state;
  }
};
