import axiosev from '../../axiosev';
import axios from 'axios';

// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SET_IS_CREATE_LOCATION = 'SET_IS_CREATE_LOCATION';
export const SET_SHOW_DETAIL_LOCATION = 'SET_SHOW_LOCATION';
export const ADD_DATA_LOCATION = 'ADD_DATA_LOCATION';
export const DELETE_DATA_LOCATION = 'DELETE_DATA_LOCATION';
export const SET_IS_EDIT = 'SET_IS_EDIT';
export const SET_UPDATE_LOCATION = 'SET_UPDATE_LOCATION';
export const SET_SEARCH_ADDRESS = 'SET_SEARCH_ADDRESS';
export const SET_SEARCH_ADDRESS_ERROR = 'SET_SEARCH_ADDRESS_ERROR';
export const SET_SELECTS_LOCATION_TASK = 'SET_SELECTS_LOCATION_TASK';

var querystring = require('querystring');

export function setSelectsLoactionTask(selectValues) {
  return {
    type: SET_SELECTS_LOCATION_TASK,
    selectValues
  }
}

export function getSearchAddress(address) {
  
  const query = querystring.stringify({
      address,
      key: 'AIzaSyAthLadW0ohUsd1okMOQ110BvyBIRgZFoI'
  })
  console.log(query);
  return dispatch => {
    dispatch(setSearchAddressData(null));
    dispatch(setErrorSearch(""));
    
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?'+query).then(response => {
      if (response.data.status !== "OK") {
        dispatch(setErrorSearch("Không tìm thấy địa chỉ"));
        return;
      }
      const data = response.data.results;
      if (data.count === 0) {
        dispatch(setErrorSearch("Không tìm thấy địa chỉ")); 
        return;     
      }

      const firstData = data[0];
      const formatted_address = firstData.formatted_address;
      const coordinate = firstData.geometry.location;
      const place_id = firstData.place_id === undefined ? "" : firstData.place_id;
      const searchData = {
        formatted_address,
        coordinate,
        place_id
      };
      console.log(searchData);
      dispatch(setSearchAddressData(searchData));

    }).catch(error => {
      console.log(error);
      dispatch(setErrorSearch("Đã có lỗi tìm kiếm"))   
    })
  }
}

function setErrorSearch(errorSearch) {
  return {
    type: SET_SEARCH_ADDRESS_ERROR,
    errorSearch
  }
}

function setSearchAddressData(dataSearch) {
  return {
    type: SET_SEARCH_ADDRESS,
    dataSearch
  }
}

export function getLocations() {
  return dispatch => {
    axiosev.get('/suppliers/locations').then(response => {
      dispatch(setLocations(response.data.data));
    });
  };
};

export function setLocations(locations) {
  console.log(locations);
  return {
    type: SET_LOCATIONS,
    locations
  }
};

export function setIsCreated(isCreated) {
  return {
    type: SET_IS_CREATE_LOCATION,
    isCreated
  }
}

export function setShowLocation(location) {
  return {
    type: SET_SHOW_DETAIL_LOCATION,
    location
  }
}

export function setHiddenLocation() {
  return {
    type: SET_SHOW_DETAIL_LOCATION,
    location: null
  }
}

export function addData(data) {
  return {
    type: ADD_DATA_LOCATION,
    data
  }
}

export function createLocation(location) {
  return dispatch => {
    axiosev.post('/locations',location).then((response) => {
      var dataR = response.data;
      console.log(dataR);
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Tạo địa điểm thất bại" , 3000));
        return;
      } 
      
      dispatch(setIsCreated(false));
      dispatch(setSnackBarMessage("Tạo địa điểm thành công" , 3000));
      console.log(dataR.data);
      dispatch(addData(dataR.data));
    }).catch(error => {
      console.log(error);
      dispatch(setSnackBarMessage("Tạo địa điểm thất bại vui lòng kiểm tra lại" , 3000));
    });
  }
}

export function deleteLocation(location) {
  return dispatch => {
    var locationID = location.location_id;
    if (locationID === null || locationID === undefined) {
      locationID = location._id;
    }
    console.log(locationID);
    axiosev.delete('/locations/'+locationID)
    .then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Xoá địa điểm thất bại" , 3000)); 
        return;
      }
      dispatch(setSnackBarMessage("Xoá địa điểm thành công" , 3000));
      dispatch(setRemoveLocation(location));
      dispatch(setHiddenLocation(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSnackBarMessage("Xoá địa điểm thất bại" , 3000));
    });
  }
}

export function updateLocation(location) {
  return dispatch => {
    var locationID = location.location_id;
    if (locationID === null) {
      locationID = location._id;
    }

    axiosev.put('/locations/' + locationID,location)
    .then(response => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Cập nhật địa điểm thất bại" , 3000)); 
        return;
      }

      dispatch(setSnackBarMessage("Cập nhật địa điểm thành công" , 3000));
      dispatch(setUpdateLocation(location));
      dispatch(setShowLocation(location));
      dispatch(setIsEdit(false))
    })
    .catch(error => {
      console.log(error);
      dispatch(setSnackBarMessage("Cập nhật địa điểm thất bại" , 3000));
    })
  }
}

export function setRemoveLocation(location) {
  return {
    type: DELETE_DATA_LOCATION,
    location
  }
}

export function setIsEdit(isEdit) {
  return {
    type: SET_IS_EDIT,
    isEdit
  }
}

export function setUpdateLocation(location) {
  return {
    type:SET_UPDATE_LOCATION,
    location
  }
}