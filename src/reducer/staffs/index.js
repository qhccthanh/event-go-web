import {
    SET_STAFFS,
    SET_IS_CREATE_STAFF,
    SET_SHOW_DETAIL_STAFF,
    ADD_DATA_STAFF,
    DELETE_DATA_STAFF,
    SET_IS_EDIT_STAFF,
    SET_UPDATE_STAFF
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  staff: null,
  isEdit: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STAFFS:
      return Object.assign({},state, {
        data: action.staffs
      });
    case SET_IS_CREATE_STAFF:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_SHOW_DETAIL_STAFF: 
      return {
        ...state,
        staff: action.staff
      }
    case ADD_DATA_STAFF: 
      state.data.push(action.data);
        return {
          ...state,
          data: state.data
        }
    case DELETE_DATA_STAFF:
        return {
          ...state,
          data: state.data.filter((staff) => {
            return staff._id !== action.staff._id;
          })
        }
    case SET_IS_EDIT_STAFF: 
    state.data
      return {
        ...state,
        staff: action.staff
      }
    case SET_UPDATE_STAFF:
      return {
        ...state,
        data: state.data.map((staff) => {
          return staff._id !== action.staff._id ? staff : action.staff;
        })
      }
    default:
      return state;
  }
};
