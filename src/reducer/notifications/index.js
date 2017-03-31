import {
    SET_NOTIFICATIONS,
    GET_NOTIFICATIONS
  } from './action';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return Object.assign({},state, {
        data: action.notifications
      });
    default:
      return state;
  }
};
