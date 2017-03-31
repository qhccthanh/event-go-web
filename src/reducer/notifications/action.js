import axiosev from '../../axiosev';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';

export function getNotifications() {
  return dispatch => {
    axiosev.get('/suppliers/notifications').then(response => {
      dispatch(setNotifications(response.data.data));
    });
  };
};

export function setNotifications(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications
  }
}
