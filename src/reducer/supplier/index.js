import {
    SET_SUPPLIER,
    SET_EXAPANED_INFO,
    SET_IS_EDIT_SUPPLIER
  } from './action';

const initialState = {
  supplier: {},
  isExpandInfo: false,
  isEditInfo: false,
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
    case SET_IS_EDIT_SUPPLIER:
      return Object.assign({},state,{
        isEditInfo: action.isEditInfo
      })
    default:
      return state;
  }
};
