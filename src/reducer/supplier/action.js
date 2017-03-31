import axiosev from '../../axiosev';

export const SET_SUPPLIER = 'SET_SUPPLIER';
export const GET_SUPPLIER = 'GET_SUPPLIER';

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
