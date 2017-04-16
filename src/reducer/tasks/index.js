import {
    SET_TASKS,
    SET_ADD_NEW_TASK,
    SET_IS_CREATED,
    SET_DELETE_TASK,
    SET_EDIT_TASK,
    SET_UPDATE_TASK,
    SET_DIALOG_CREATE_TASK
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  task: null,
  dialogTask: null,

};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        data: action.tasks
      }
    case SET_ADD_NEW_TASK:
      state.data.push(action.task);
      return {
        ...state
      }
    case SET_IS_CREATED:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_DELETE_TASK:
      const newData = state.data.filter(task => {
        return task._id !== action.task._id;
      })
      return {
        ...state,
        data: newData
      }
    case SET_EDIT_TASK:
      return {
        ...state,
        task: action.task
      }
    case SET_UPDATE_TASK:
      return {
        ...state,
        data: state.data.map((task) => {
          return task._id !== action.task._id ? task : action.task;
        })
      }
    case SET_DIALOG_CREATE_TASK: {
      return {
        ...state,
        dialogTask: action.dialogTask
      }
    }
    default:
      return state;
  }
};
