import axiosev from '../../axiosev';
// import {store} from '../../storeConfigure';
import {setSnackBarMessage} from '../dashboard/action';

export const SET_IMAGES = 'SET_IMAGES';
export const SET_IS_CREATED_IMAGE = 'SET_IS_CREATED_IMAGE';
export const SET_LOCAL_IMAGES =  'SET_LOCAL_IMAGES';

export function getImages() {
    return dispatch => {
    axiosev.get('/images').then(response => {
      dispatch(setImages(response.data.data));
    });
  };
}

export function uploadImages(images) {

    return dispatch => {
        var lastData = '';
        Object.keys(images).forEach((key) => {
            var imageDataBase64 = images[key];
            var arrayI = imageDataBase64.split(',');
            if(arrayI.length !== 2) {
                console.log(arrayI);
                return;
            }

            lastData = arrayI[1];
        });

        if (lastData === '') {
            dispatch(setSnackBarMessage('Hình ảnh rổng',3000));
            return;
        }

        axiosev.post('/images',{
            "file_encode_64": lastData
        })
        .then((response) => {
            var dataR = response.data;
            if (dataR === null || dataR.code !== 200) {
                dispatch(setSnackBarMessage("Tạo hình ảnh thất bại" , 3000));
                return;
            } 

            dispatch(setSnackBarMessage("Tạo hình ảnh thành công" , 3000));
            console.log(dataR);
            getImages();
            dispatch(setIsCreated(false));
        })
        .catch((error) => {
            console.error(error);
            dispatch(setSnackBarMessage('Hình tải lên thất bại',3000));
        })
    }
}

export function setIsCreated(isCreated) {
    return {
        type: SET_IS_CREATED_IMAGE,
        isCreated
    }
}

export function setLocalImages(images) {
    return {
        type: SET_LOCAL_IMAGES,
        images
    }
}

function setImages(images) {
    return {
        type: SET_IMAGES,
        images
    }
}