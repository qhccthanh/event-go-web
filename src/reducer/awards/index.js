import {
    SET_AWARDS,
    SET_ADD_NEW_AWARD,
    SET_IS_CREATED,
    SET_DELETE_AWARD,
    SET_EDIT_AWARD,
    SET_UPDATE_AWARD
  } from './action';

const initialState = {
  data: [],
  isCreated: false,
  award: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AWARDS:
      return {
        ...state,
        data: action.awards
      }
    case SET_ADD_NEW_AWARD:
      state.data.push(action.award);
      return {
        ...state
      }
    case SET_IS_CREATED:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_DELETE_AWARD:
      const newData = state.data.filter(award => {
        return award._id !== action.award._id;
      })
      return {
        ...state,
        data: newData
      }
    case SET_EDIT_AWARD:
      return {
        ...state,
        award: action.award
      }
    case SET_UPDATE_AWARD:
      return {
        ...state,
        data: state.data.map((award) => {
          return award._id !== action.award._id ? award : action.award;
        })
      }
    default:
      return state;
  }
};
