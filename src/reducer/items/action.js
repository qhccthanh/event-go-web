import axiosev from '../../axiosev';
import {store} from '../../storeConfigure';

export const SET_ITEMS = 'SET_ITEMS';
export const GET_ITEMS = 'GET_ITEMS';

export function getItems() {
  return dispatch => {
    axiosev.get('/suppliers/items').then(response => {
      dispatch(setItems(response.data.data));
    });
  };
};

export function setItems(items) {
  console.log(items);
  return {
    type: SET_ITEMS,
    items
  }
};
