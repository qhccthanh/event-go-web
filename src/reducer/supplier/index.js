import {
    SET_SUPPLIER,
    GET_SUPPLIER,
    SET_EXAPANED_INFO
  } from './action';

const initialState = {
  supplier: [],
  isExpandInfo: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPPLIER:
      return Object.assign({},state, {
        supplier: action.supplier
      });
    case SET_EXAPANED_INFO:
      return Object.assign({},state,{
        isExpandInfo: action.isExpandInfo
      })
    default:
      return state;
  }
};
