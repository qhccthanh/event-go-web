import axiosev from '../../axiosev';

export const SET_LOCATION = 'SET_LOCATION';
export const GET_LOCATION = 'GET_LOCATION';

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
