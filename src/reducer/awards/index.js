import {
    SET_AWARD,
  } from './action';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AWARD:
      return Object.assign({},state, {
        data: action.awards
      });
    default:
      return state;
  }
};
