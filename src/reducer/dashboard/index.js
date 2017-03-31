import {
    SET_SHOW_MENU,
  } from './action';

const initialState = {
  isShowMenu: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_MENU:
      return Object.assign({},state, {
        isShowMenu: action.show
      });
    default:
      return state;
  }
};
