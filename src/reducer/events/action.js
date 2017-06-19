import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_EVENTS = 'SET_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';
export const SET_IS_CREATED = 'SET_IS_CREATED';
export const SET_SHOW_DETAIL_EVENT = 'SET_SHOW_DETAIL_EVENT';
export const SET_ADD_NEW_EVENT = 'SET_ADD_NEW_EVENT';
export const SET_IS_EDIT_EVENT = 'SET_IS_EDIT_EVENT';
export const DELETE_DATA_EVENT = 'DELETE_DATA_EVENT';
export const SET_UPDATE_EVENT = 'SET_UPDATE_EVENT';

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

export function setIsEdit(isEdit) {
  return {
    type: SET_IS_EDIT_EVENT,
    isEdit
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

export function deleteEvent(event) {
  return dispatch => {
    var eventID = event.event_id;
    console.log(event);
    if (eventID === null || eventID === undefined) {
      eventID = event._id;
    }

    axiosev.delete('/events/'+eventID)
    .then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Xoá sự kiện thất bại" , 3000)); 
        return;
      }
      dispatch(setSnackBarMessage("Xoá sự kiện thành công" , 3000));
      dispatch(setRemoveEvent(event));
      dispatch(setHideShowDetailEvent(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSnackBarMessage("Xoá sự kiện thất bại" , 3000));
    });
  }
}

export function updateEvent(event) {
  return dispatch => {
    var eventID = event.event_id;
    if (eventID === null) {
      eventID = event._id;
    }

    axiosev.put('/events/' + eventID,event)
    .then(response => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Cập nhật sự kiện thất bại" , 3000)); 
        return;
      }

      dispatch(setSnackBarMessage("Cập nhật sự kiện thành công" , 3000));
      dispatch(setUpdateEvent(event));
      dispatch(setShowDetailEvent(event));
      dispatch(setIsEdit(false))
    })
    .catch(error => {
      console.log(error);
      dispatch(setSnackBarMessage("Cập nhật sự kiện thất bại" , 3000));
    })
  }
}

export function setRemoveEvent(event) {
  return {
    type: DELETE_DATA_EVENT,
    event
  }
}

export function setUpdateEvent(event) {
  return {
    type:SET_UPDATE_EVENT,
    event
  }
}