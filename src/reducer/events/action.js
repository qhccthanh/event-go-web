import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_EVENTS = 'SET_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';
export const SET_IS_CREATED = 'SET_IS_CREATED';
export const SET_SHOW_DETAIL_EVENT = 'SET_SHOW_DETAIL_EVENT';
export const SET_ADD_NEW_EVENT = 'SET_ADD_NEW_EVENT';

export const SET_ADD_NEW_AWARD = '';
export const SET_OPEN_CREATE_AWARD = '';
export const SET_DELETE_AWARD = '';
export const SET_IS_EDIT_AWARD = '';
export const SET_UPDATE_AWARD = '';

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

export function setAddEvent(event) {
  return {
    type: SET_ADD_NEW_EVENT,
    event
  }
}

export function createEvent(eventInfo) {
  console.log(eventInfo);
  return dispatch => {
    axiosev.post('/events', eventInfo)
    .then(response => {
      var dataR = response.data;
      if (dataR.code !== 200) {
        console.error(dataR.error);
        dispatch(setSnackBarMessage("Tạo sự kiện thất bại" , 3000));
        return;
      }

      dataR = dataR.data;
      dispatch(setAddEvent(dataR));
      dispatch(setIsCreated(false));
    })
    .catch(error => {
      console.error(error);
      dispatch(setSnackBarMessage("Tạo sự kiện thất bại" , 3000));
    });
  }
}