import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_ITEMS = 'SET_ITEMS';
export const SET_IS_CREATE_ITEM = 'SET_IS_CREATE_ITEM';
export const SET_SHOW_DETAIL_ITEM = 'SET_SHOW_ITEM';
export const ADD_DATA_ITEM = 'ADD_DATA_ITEM';
export const DELETE_DATA_ITEM = 'DELETE_DATA_ITEM';
export const SET_IS_EDIT = 'SET_IS_EDIT';
export const SET_UPDATE_ITEM = 'SET_UPDATE_ITEM';

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

export function addData(data) {
  return {
    type: ADD_DATA_ITEM,
    data
  }
}

export function createItem(item) {
  return dispatch => {
    axiosev.post('/items',item).then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Tạo vật phẩm thất bại" , 3000));
        return;
      } 

      dispatch(setIsCreated(false));
      dispatch(setSnackBarMessage("Tạo vật phẩm thành công" , 3000));
      dispatch(addData(dataR.data));
    }).catch(error => {
      
      dispatch(setIsCreated(false));
      dispatch(setSnackBarMessage("Tạo vật phẩm thất bại vui lòng kiểm tra lại" , 3000));
    });
  }
}

export function deleteItem(item) {
  return dispatch => {
    var itemID = item.item_id;
    if (itemID === null) {
      itemID = item._id;
    }

    axiosev.delete('/items/'+itemID)
    .then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Xoá vật phẩm thất bại" , 3000)); 
        return;
      }
      dispatch(setSnackBarMessage("Xoá vật phẩm thành công" , 3000));
      dispatch(setRemoveItem(item));
      dispatch(setHiddenItem(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSnackBarMessage("Xoá vật phẩm thất bại" , 3000));
    });
  }
}

export function updateItem(item) {
  return dispatch => {
    var itemID = item.item_id;
    if (itemID === null) {
      itemID = item._id;
    }

    axiosev.put('/items/' + itemID,item)
    .then(response => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Cập nhật vật phẩm thất bại" , 3000)); 
        return;
      }

      dispatch(setSnackBarMessage("Cập nhật vật phẩm thành công" , 3000));
      dispatch(setUpdateItem(item));
      dispatch(setShowItem(item));
      dispatch(setIsEdit(false))
    })
    .catch(error => {
      console.log(error);
      dispatch(setSnackBarMessage("Cập nhật vật phẩm thất bại" , 3000));
    })
  }
}

export function setRemoveItem(item) {
  return {
    type: DELETE_DATA_ITEM,
    item
  }
}

export function setIsEdit(isEdit) {
  return {
    type: SET_IS_EDIT,
    isEdit
  }
}

export function setUpdateItem(item) {
  return {
    type:SET_UPDATE_ITEM,
    item
  }
}