import {
    SET_SHOW_MENU,
    SET_SHOW_SNACK_BAR
  } from './action';

const initialState = {
  isShowMenu: true,
  snackBar: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_MENU:
      return Object.assign({},state, {
        isShowMenu: action.show
      });
    case SET_SHOW_SNACK_BAR:
      return {
        ...state,
        snackBar: action.snackBar
      }
    default:
      return state;
  }
};
