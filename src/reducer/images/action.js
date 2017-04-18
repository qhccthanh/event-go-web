import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_IMAGES = 'SET_IMAGES';

export function getImages() {
    return dispatch => {
    axiosev.get('/images').then(response => {
      dispatch(setImages(response.data.data));
    });
  };
}

function setImages(images) {
    return {
        type: SET_IMAGES,
        images
    }
}