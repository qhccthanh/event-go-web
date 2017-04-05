import {
    SET_TASK,
  } from './action';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK:
      return Object.assign({},state, {
        data: action.tasks
      });
    default:
      return state;
  }
};
