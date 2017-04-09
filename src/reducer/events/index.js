import {
    SET_EVENTS,
    SET_IS_CREATED,
    SET_SHOW_DETAIL_EVENT,
    SET_ADD_NEW_EVENT
  } from './action';

const initialState = {
  data: [],
  showEvent: null,
  isCreated: false
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
    default:
      return state;
  }
};
