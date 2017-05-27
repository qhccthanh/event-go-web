import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
// export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const SET_IS_CREATE_NOTIFICATION = 'SET_IS_CREATE_NOTIFICATION';
export const SET_SHOW_DETAIL_NOTIFICATION= 'SET_SHOW_DETAIL_NOTIFICATION';
export const ADD_DATA_NOTIFICATION = 'ADD_DATA_NOTIFICATION';
export const DELETE_DATA_NOTIFICATION = 'DELETE_DATA_NOTIFICATION';

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

export function addData(data) {
  return {
    type: ADD_DATA_NOTIFICATION,
    data
  }
}

export function createNotification(locationInfo) {
  return dispatch => {
    axiosev.post('/suppliers/notifications', locationInfo)
      .then( response => {
        var dataR = response.data;
        
        if (dataR === null || dataR.code !== 200) {
          dispatch(setSnackBarMessage("Tạo thông báo thất bại" , 3000));
          return;
        } 
        
        dispatch(addData(dataR.data));
        dispatch(setIsCreated(false));
        dispatch(setSnackBarMessage("Tạo thông báo thành công" , 3000));
      }).catch(error => {
        console.log(error);
        dispatch(setSnackBarMessage("Tạo thông báo thất bại vui lòng kiểm tra lại" , 3000));
      });
  }
}

export function  pushNotification(notification) {
  return dispatch => {
      axiosev.post('/suppliers/notifications/'+notification._id)
        .then( response => {
        var dataR = response.data;
        
        if (dataR === null || dataR.code !== 200) {
          dispatch(setSnackBarMessage("Push thông báo thất bại" , 3000));
          return;
        } 
        
        dispatch(setSnackBarMessage("Push thông báo thành công" , 3000));
      }).catch(error => {
        console.log(error);
        dispatch(setSnackBarMessage("Push thông báo thất bại vui lòng kiểm tra lại" , 3000));
      });
  }
}

export function setRemoveNotification(notification) {
  return {
    type: DELETE_DATA_NOTIFICATION,
    notification
  }
}

export function deleteNotification(notification) {
  return dispatch => {
      axiosev.delete('/suppliers/notifications/'+notification._id)
        .then( response => {
        var dataR = response.data;
        
        if (dataR === null || dataR.code !== 200) {
          dispatch(setSnackBarMessage("Xoa thông báo thất bại" , 3000));
          return;
        } 
        dispatch(setRemoveNotification(notification));
        dispatch(setSnackBarMessage("Xoa thông báo thành công" , 3000));
      }).catch(error => {
        console.log(error);
        dispatch(setSnackBarMessage("Xoa thông báo thất bại vui lòng kiểm tra lại" , 3000));
      });
  }
}