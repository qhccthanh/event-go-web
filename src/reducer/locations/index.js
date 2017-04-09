import {
    SET_LOCATIONS,
    SET_IS_CREATE_LOCATION,
    SET_SHOW_DETAIL_LOCATION,
    ADD_DATA_LOCATION,
    DELETE_DATA_LOCATION,
    SET_IS_EDIT,
    SET_UPDATE_LOCATION,
    SET_SEARCH_ADDRESS,
    SET_SEARCH_ADDRESS_ERROR
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  location: null,
  isEdit: false,
  dataSearch: null,
  errorSearch: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return Object.assign({},state, {
        data: action.locations
      });
    case SET_IS_CREATE_LOCATION:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_SHOW_DETAIL_LOCATION: 
      return {
        ...state,
        location: action.location
      }
    case ADD_DATA_LOCATION: 
      state.data.push(action.data);
        return {
          ...state,
          data: state.data
        }
    case DELETE_DATA_LOCATION:
        return {
          ...state,
          data: state.data.filter((location) => {
            return location._id !== action.location._id;
          })
        }
    case SET_IS_EDIT: 
      return {
        ...state,
        isEdit: action.isEdit
      }
    case SET_UPDATE_LOCATION:
      return {
        ...state,
        data: state.data.map((location) => {
          return location._id !== action.location._id ? location : action.location;
        })
      }
    case SET_SEARCH_ADDRESS: {
      return {
        ...state,
        dataSearch: action.dataSearch
      }
    }
    case SET_SEARCH_ADDRESS_ERROR: 
      return {
        ...state,
        errorSearch: action.errorSearch
      }
    default:
      return state;
  }
};
