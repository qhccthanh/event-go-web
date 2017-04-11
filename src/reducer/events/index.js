import {
    SET_EVENTS,
    SET_IS_CREATED,
    SET_SHOW_DETAIL_EVENT,
    SET_ADD_NEW_EVENT,
    SET_IS_EDIT_EVENT,
    DELETE_DATA_EVENT,
    SET_UPDATE_EVENT
  } from './action';

const initialState = {
  data: [],
  showEvent: null,
  isCreated: false,
  isEdit: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return Object.assign({},state, {
        data: action.events
      });
    case SET_IS_CREATED:
      return Object.assign({},state,{
        isCreated: action.isCreated
      });
    case SET_SHOW_DETAIL_EVENT:
      return Object.assign({},state,{
        showEvent: action.showEvent
      });
    case SET_ADD_NEW_EVENT:
      state.data.push(action.event)
      return state;
    case SET_IS_EDIT_EVENT:
      return {
        ...state,
        isEdit: action.isEdit
      }
    case SET_UPDATE_EVENT:
      return {
        ...state,
        data: state.data.map((event) => {
          return event._id !== action.event._id ? event : action.event;
        })
      }
    case DELETE_DATA_EVENT:
        return {
          ...state,
          data: state.data.filter((event) => {
            return event._id !== action.event._id;
          })
        }
    default:
      return state;
  }
};
