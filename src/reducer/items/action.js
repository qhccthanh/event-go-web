import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';

export const SET_ITEMS = 'SET_ITEMS';
export const GET_ITEMS = 'GET_ITEMS';
export const SET_IS_CREATE_ITEM = 'SET_IS_CREATE_ITEM';
export const SET_SHOW_DETAIL_ITEM = 'SET_SHOW_ITEM';

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

export function setIsCreated(isCreated) {
  return {
    type: SET_IS_CREATE_ITEM,
    isCreated
  }
}

export function setShowItem(item) {
  return {
    type: SET_SHOW_DETAIL_ITEM,
    item
  }
}

export function setHiddenItem() {
  return {
    type: SET_SHOW_DETAIL_ITEM,
    item: null
  }
}

export function createItem(item) {
  return dispatch => {
    axiosev.post('/items',item).then((response) => {
      console.log('Create item: ' + response.data);
    dispatch(setIsCreated(false));
    }).catch(error => {
      console.log('Create item: ' + error);
      dispatch(setIsCreated(false));
    });
  }
}