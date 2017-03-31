import axiosev from '../../axiosev';

export const SET_EVENTS = 'SET_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';

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
}
