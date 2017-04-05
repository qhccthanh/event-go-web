import {
    SET_ITEMS,
    SET_IS_CREATE_ITEM,
    SET_SHOW_DETAIL_ITEM
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return Object.assign({},state, {
        data: action.items
      });
    case SET_IS_CREATE_ITEM:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_SHOW_DETAIL_ITEM: 
      return {
        ...state,
        item: action.item
      }
    default:
      return state;
  }
};
