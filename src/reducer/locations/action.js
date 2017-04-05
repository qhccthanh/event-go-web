import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';

export const SET_LOCATION = 'SET_LOCATION';
export const GET_LOCATION = 'GET_LOCATION';
export const SET_IS_CREATE_LOCATION = 'SET_IS_CREATE_LOCATION';
export const SET_SHOW_DETAIL_LOCATION = 'SET_SHOW_DETAIL_LOCATION';

export function getLocations() {
  return dispatch => {
    axiosev.get('/suppliers/locations').then(response => {
      dispatch(setLocations(response.data.data));
    });
  };
};

export function setLocations(locations) {
  return {
    type: SET_LOCATION,
    locations
  }
}

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

export function createLocation(locationInfo) {
  
}