import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';

export const SET_EVENTS = 'SET_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';
export const SET_IS_CREATED = 'SET_IS_CREATED';
export const SET_SHOW_DETAIL_EVENT = 'SET_SHOW_DETAIL_EVENT';

export function getEvents() {
  return dispatch => {
    axiosev.get('/suppliers/events').then(response => {
      dispatch(setEvents(response.data.data));
    });
  };
};

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events
  }
};

export function setIsCreated(isCreated) {
  return {
    type: SET_IS_CREATED,
    isCreated
  }
};

export function setShowDetailEvent(event) {
  return {
    type: SET_SHOW_DETAIL_EVENT,
    showEvent: event
  }
};

export function setHideShowDetailEvent() {
  return {
    type: SET_SHOW_DETAIL_EVENT,
    showEvent: null
  }
}

export function createEvent(eventInfo) {
  console.log(eventInfo);
  
}