import axiosev from '../../axiosev';
import {store} from '../../storeConfigure';

export const SET_SUPPLIER = 'SET_SUPPLIER';
export const GET_SUPPLIER = 'GET_SUPPLIER';
export const SET_EXAPANED_INFO = 'SET_EXAPANED_INFO';
export const SET_IS_EDIT_SUPPLIER = 'SET_IS_EDIT_SUPPLIER';

export function getSupplier(id) {
  return dispatch => {
    axiosev.get('/suppliers').then(response => {
      dispatch(setSupplier(response.data.data));
    })
  };
};

export function setSupplier(supplier) {
  return {
    type: SET_SUPPLIER,
    supplier
  }
};

export function updateInfo(info) {
  console.log("Call something");
  return dispatch => {
    axiosev.put('/suppliers', info).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}

export function setExpandInfo() {
  
  const isExpandInfo = !store.getState().supplier.isExpandInfo;
  console.log("call");
  console.log(isExpandInfo);

  return  {
    type: SET_EXAPANED_INFO,
    isExpandInfo
  }
}

export function setIsEditSupplier() {
  const isEditInfo = !store.getState().supplier.isEditInfo;
  return {
    type: SET_IS_EDIT_SUPPLIER,
    isEditInfo
  }
}