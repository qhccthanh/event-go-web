import axiosev from '../../axiosev';
import axios from 'axios';

// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_STAFFS = 'SET_STAFFS';
export const SET_IS_CREATE_STAFF = 'SET_IS_CREATE_STAFF';
export const SET_SHOW_DETAIL_STAFF = 'SET_SHOW_STAFF';
export const ADD_DATA_STAFF = 'ADD_DATA_STAFF';
export const DELETE_DATA_STAFF = 'DELETE_DATA_STAFF';
export const SET_IS_EDIT_STAFF = 'SET_IS_EDIT_STAFF'
export const SET_UPDATE_STAFF = 'SET_UPDATE_STAFF'

export function getStaffs() {
  return dispatch => {
    axiosev.get('/suppliers/staffs').then(response => {
      dispatch(setStaffs(response.data.data));
    });
  };
};

export function setStaffs(staffs) {
  console.log(staffs);
  return {
    type: SET_STAFFS,
    staffs
  }
};

export function setIsCreated(isCreated) {
  return {
    type: SET_IS_CREATE_STAFF,
    isCreated
  }
}

export function setShowStaff(staff) {
  return {
    type: SET_SHOW_DETAIL_STAFF,
    staff
  }
}

export function setHiddenStaff() {
  return {
    type: SET_SHOW_DETAIL_STAFF,
    staff: null
  }
}

export function addData(data) {
  return {
    type: ADD_DATA_STAFF,
    data
  }
}

export function createStaff(staff) {
  return dispatch => {
    axiosev.post('/suppliers/staffs',staff).then((response) => {
      var dataR = response.data;
      console.log(dataR);
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Tạo nhân viên thất bại" , 3000));
        return;
      } 
      
      dispatch(setIsCreated(false));
      dispatch(setSnackBarMessage("Tạo nhân viên thành công" , 3000));
      console.log(dataR.data);
      dispatch(addData(dataR.data));
    }).catch(error => {
      console.log(error);
      dispatch(setSnackBarMessage("Tạo nhân viên thất bại vui lòng kiểm tra lại" , 3000));
    });
  }
}

export function deleteStaff(staff) {
  return dispatch => {
    var staffID = staff.staff_id;
    if (staffID === null || staffID === undefined) {
      staffID = staff._id;
    }
    console.log(staffID);
    axiosev.delete('suppliers/staffs/'+staffID)
    .then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Xoá nhân viên thất bại" , 3000)); 
        return;
      }
      dispatch(setSnackBarMessage("Xoá nhân viên thành công" , 3000));
      dispatch(setRemoveStaff(staff));
      dispatch(setHiddenStaff(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSnackBarMessage("Xoá nhân viên thất bại" , 3000));
    });
  }
}

export function setEditStaff(staff) {
  return {
      type: SET_IS_EDIT_STAFF,
      staff
  }
}

export function setUpdateStaff(staff) {
  return {
      type: SET_UPDATE_STAFF,
      staff
  }
}

export function updateStaff(staff) {
  return dispatch => {
      var staffID = staff.staff_id;
      if (staffID === null || staffID === undefined) {
        staffID = staff._id;
      }

      axiosev.put('suppliers/staffs/'+staffID, staff)
      .then(response => {
        var dataR = response.data;
        if (dataR === null || dataR.code !== 200) {
          dispatch(setSnackBarMessage("Cập nhật nhân viên thất bại" , 3000)); 
          return;
        }

        dispatch(setSnackBarMessage("Cập nhật nhân viên thành công" , 3000));
        dispatch(setUpdateStaff(staff));
        dispatch(setEditStaff(null));
      })
      .catch(error => {
        console.log(error);
        dispatch(setSnackBarMessage("Cập nhật nhân viên thất bại" , 3000));
      })
    }
}

export function setRemoveStaff(staff) {
  return {
    type: DELETE_DATA_STAFF,
    staff
  }
}