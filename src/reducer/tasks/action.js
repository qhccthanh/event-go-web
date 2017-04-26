import axiosev from '../../axiosev';

export const SET_TASKS = 'SET_TASKS';
// export const GET_TASK = 'GET_TASK';
export const SET_ADD_NEW_TASK = 'SET_ADD_NEW_TASK';
export const SET_IS_CREATED = 'SET_IS_CREATED_TASK';
export const SET_DELETE_TASK = 'SET_DELETE_TASK';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const SET_UPDATE_TASK = 'SET_UPDATE_TASK';
export const SET_DIALOG_CREATE_TASK = 'SET_DIALOG_CREATE_TASK';

import {setSnackBarMessage} from '../dashboard/action';

export function setDialogCreateTask(dialogTask) {
  return {
    type: SET_DIALOG_CREATE_TASK,
    dialogTask
  }
}

export function getTask() {
  return dispatch => {
    axiosev.get('/suppliers/tasks').then(response => {
      // dispatch(setTask(response.data.data));
    });
  }
}

export function getTaskFromEventID(event_id) {
  return dispatch => {
    axiosev.get('/events/'+event_id+'/tasks').then(response => {
      console.log(response);
      dispatch(setTasks(response.data.data));
    });
  }
}

export function createTaskWithLocations(locations,event_id) {
  return dispatch => {
    locations.forEach((location, index) => {
      dispatch(createTaskWithLocation(location,event_id));
    })
  }
}

export function createTaskWithLocation(location,event_id) {
  return dispatch => {
    const newTask = {
      'name': 'Tìm ' + location.name,
      'sub_name': location.address,
      'thumbnail_url': location.image_url,
      'task_type': 'location',
      'task_info': location,
      'description': 'Đến địa điểm ' + location.name + ' tại địa chỉ: ' + location.location_info.formatted_address + 
                     ' chụp ảnh, checkin facebook vs hastag #circleK',
      'task_validate_type': 'share_photo'
    }
    axiosev.post('/events/'+event_id+'/tasks', newTask)
      .then(response => {
        dispatch(setAddNewTask(response.data.data));
        dispatch(setSnackBarMessage("Tạo nhiệm vụ "+ location.name +" thành công" , 1000)); 
      })
      .catch(error => {
        dispatch(setSnackBarMessage("Tạo nhiệm vụ thất bại" , 1000)); 
      });

      dispatch(setDialogCreateTask(null));
  }  
}

export function createNewTaskFromEventID(event_id) {
  return dispatch => {
    axiosev.post('/events/'+event_id+'/tasks')
    .then(response => {
        dispatch(setAddNewTask(response.data.data));
    });
  }
}

export function setTasks(tasks) {
  return {
    type: SET_TASKS,
    tasks
  }
}

export function setIsCreated(isCreated) {
  return {
      type: SET_IS_CREATED,
      isCreated
    }
}

export function setAddNewTask(task) {
  return dispatch => {
    dispatch({
      type: SET_ADD_NEW_TASK,
      task
    })
  }
}

export function deleteTask(task, event_id) {
  return dispatch => {
    var taskID = task.task_id;
    if (taskID === null || taskID === undefined) {
      taskID = task._id;
    }

    axiosev.delete('events/'+event_id+'/tasks/'+taskID)
    .then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Xoá nhiệm vụ thất bại" , 3000)); 
        return;
      }
      dispatch(setSnackBarMessage("Xoá nhiệm vụ thành công" , 3000));
      dispatch(setDeleteTask(task));
      dispatch(setEditTask(null));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSnackBarMessage("Xoá nhiệm vụ thất bại" , 3000));
    });
  }
}

export function updateTask(task, event_id) {
  return dispatch => {
      var taskID = task.task_id;
      if (taskID === null) {
        taskID = task._id;
      }

      axiosev.put('events/'+event_id+'/tasks/'+taskID, task)
      .then(response => {
        var dataR = response.data;
        if (dataR === null || dataR.code !== 200) {
          dispatch(setSnackBarMessage("Cập nhật nhiệm vụ thất bại" , 3000)); 
          return;
        }

        dispatch(setSnackBarMessage("Cập nhật nhiệm vụ thành công" , 3000));
        dispatch(setUpdateTask(task));
        dispatch(setEditTask(task));
      })
      .catch(error => {
        console.log(error);
        dispatch(setSnackBarMessage("Cập nhật nhiệm vụ thất bại" , 3000));
      })
    }
}

function setDeleteTask(task) {
  return {
    type: SET_DELETE_TASK,
    task
  }
}

export function setEditTask(task) {
  return {
      type: SET_EDIT_TASK,
      task
  }
}

export function setUpdateTask(task) {
  return {
      type: SET_UPDATE_TASK,
      task
  }
}