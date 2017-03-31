import {
    SET_LOCATION,
    GET_LOCATION
  } from './action';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({},state, {
        data: action.locations
      });
    default:
      return state;
  }
};
