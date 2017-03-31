import {
    SET_ITEMS,
    GET_ITEMS,
  } from './action';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return Object.assign({},state, {
        data: action.items
      });
    default:
      return state;
  }
};
