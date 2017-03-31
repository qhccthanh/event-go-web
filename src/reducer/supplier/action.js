import axiosev from '../../axiosev';
import {store} from '../../storeConfigure';

export const SET_SUPPLIER = 'SET_SUPPLIER';
export const GET_SUPPLIER = 'GET_SUPPLIER';
export const SET_EXAPANED_INFO = 'SET_EXAPANED_INFO';
export const SET_IS_EDIT_SUPPLIER = 'SET_IS_EDIT_SUPPLIER';
export const SET_SUPPLIER_INFO = 'SET_SUPPLIER_INFO';

export function getSupplier() {
  return dispatch => {
    
    axiosev.get('/suppliers/me').then(response => {
      dispatch(setSupplier(response.data.data));
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };
};

export function setSupplier(supplier) {
  return {
    type: SET_SUPPLIER,
    supplier
  }
};

export function updateInfo(info) {
  return dispatch => {
    axiosev.put('/suppliers', info).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}

export function setSupplierInfo(info) {
  return {
    type: SET_SUPPLIER_INFO,
    supplier: info
  }
}

export function setExpandInfo() {
  
  const isExpandInfo = !store.getState().supplier.isExpandInfo;
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