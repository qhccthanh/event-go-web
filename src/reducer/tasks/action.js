import axiosev from '../../axiosev';

export const SET_TASKS = 'SET_TASKS';
// export const GET_TASK = 'GET_TASK';
export const SET_ADD_NEW_TASK = 'SET_ADD_NEW_TASK';
export const SET_IS_CREATED = 'SET_IS_CREATED_TASK';
export const SET_DELETE_TASK = 'SET_DELETE_TASK';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const SET_UPDATE_TASK = 'SET_UPDATE_TASK';

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
      dispatch(setTasks(response.data.data));
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

export function setDeleteTask(task) {
  return dispatch => {
    dispatch({
      type: SET_DELETE_TASK,
      task
    })
  }
}

export function setEditTask(task) {
  return dispatch => {
    dispatch({
      type: SET_EDIT_TASK,
      task
    })
  }
}

export function setUpdateTask(task) {
  return dispatch => {
    dispatch({
      type: SET_UPDATE_TASK,
      task
    })
  }
}