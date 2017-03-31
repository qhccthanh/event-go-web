import axiosev from '../../axiosev';

export const SET_TASK = 'SET_TASK';
export const GET_TASK = 'GET_TASK';

export function getTask() {
  return dispatch => {
    axiosev.get('/suppliers/tasks').then(response => {
      dispatch(setTask(response.data.data));
    });
  }
}

export function setTask(tasks) {
  return {
    type: SET_TASK,
    tasks
  }
}
