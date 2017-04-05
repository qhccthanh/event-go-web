import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
// export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const SET_IS_CREATE_NOTIFICATION = 'SET_IS_CREATE_NOTIFICATION';
export const SET_SHOW_DETAIL_NOTIFICATION= 'SET_SHOW_DETAIL_NOTIFICATION';

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

export function setIsCreated(isCreated) {
  return {
    type: SET_IS_CREATE_NOTIFICATION,
    isCreated
  }
}

export function setShowNotification(notification) {
  return {
    type: SET_SHOW_DETAIL_NOTIFICATION,
    notification
  }
}

export function setHiddenNotification() {
  return {
    type: SET_SHOW_DETAIL_NOTIFICATION,
    notification: null
  }
}

export function createNotification(locationInfo) {
  
}