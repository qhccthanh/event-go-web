import {
    SET_NOTIFICATIONS,
    SET_IS_CREATE_NOTIFICATION,
    SET_SHOW_DETAIL_NOTIFICATION,
    ADD_DATA_NOTIFICATION,
    DELETE_DATA_NOTIFICATION
  } from './action';

const initialState = {
  data: [],
  notification: null,
  isCreated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return Object.assign({},state, {
        data: action.notifications
      });
    case SET_IS_CREATE_NOTIFICATION:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_SHOW_DETAIL_NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      }
    case ADD_DATA_NOTIFICATION: 
        state.data.push(action.data);
        return {
          ...state,
          data: state.data
      }
    case DELETE_DATA_NOTIFICATION: 
      return {
          ...state,
          data: state.data.filter((notification) => {
            return notification._id !== action.notification._id;
          })
        }
    default:
      return state;
  }
};
