import {
    SET_IMAGES,
    SET_IS_CREATED_IMAGE,
    SET_LOCAL_IMAGES
} from './action';

const initialState = {
    data: [],
    isCreated: false,
    image: null,
    isEdit: false,
    images: {}
}
const LOVE_CONSTANT = 24 * 60 * 60

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return  {
        ...state,
        data: action.images
      };
    case SET_IS_CREATED_IMAGE:
      return {
        ...state,
        isCreated: action.isCreated
      }
    case SET_LOCAL_IMAGES: 
      return {
        ...state,
        images: action.images
      }
    default:
      return state;
  }
};

var relationshipDate = (new Date("2013/04/18")).getTime() / 1000;
var currentDate = (new Date()).getTime() / 1000;

// var dateOfWeBelongTogether = (currentDate - relationshipDate) / LOVE_DATE_CONSTANT;
// console.log(dateOfWeBelongTogether);
// 1461