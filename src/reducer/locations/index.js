import {
    SET_LOCATION,
    SET_IS_CREATE_LOCATION,
    SET_SHOW_DETAIL_LOCATION
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  location: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({},state, {
        data: action.locations
      });
    case SET_IS_CREATE_LOCATION:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_SHOW_DETAIL_LOCATION:
      return {
        ...state,
        location: action.location
      }
    default:
      return state;
  }
};
