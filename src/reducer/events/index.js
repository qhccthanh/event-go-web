import {
    SET_EVENTS,
    GET_EVENTS,
  } from './action';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return Object.assign({},state, {
        data: action.events
      });
    default:
      return state;
  }
};
