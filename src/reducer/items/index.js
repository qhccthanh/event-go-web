import {
    SET_ITEMS,
    SET_IS_CREATE_ITEM,
    SET_SHOW_DETAIL_ITEM,
    ADD_DATA_ITEM,
    DELETE_DATA_ITEM,
    SET_IS_EDIT,
    SET_UPDATE_ITEM
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  item: null,
  isEdit: false
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
    case ADD_DATA_ITEM: 
        state.data.push(action.item)
        return {
          ...state,
          data: state.data
        }
    case DELETE_DATA_ITEM:
        return {
          ...state,
          data: state.data.filter((item) => {
            return item._id !== action.item._id;
          })
        }
    case SET_IS_EDIT: 
      return {
        ...state,
        isEdit: action.isEdit
      }
    case SET_UPDATE_ITEM:
      return {
        ...state,
        data: state.data.map((item) => {
          return item._id !== action.item._id ? item : action.item;
        })
      }
    default:
      return state;
  }
};
