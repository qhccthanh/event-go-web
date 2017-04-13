import axiosev from '../../axiosev';

export const SET_AWARDS = 'SET_AWARDS';
// export const GET_AWARD = 'GET_AWARD';
export const SET_ADD_NEW_AWARD = 'SET_ADD_NEW_AWARD';
export const SET_IS_CREATED = 'SET_IS_CREATED_AWARD';
export const SET_DELETE_AWARD = 'SET_DELETE_AWARD';
export const SET_EDIT_AWARD = 'SET_EDIT_AWARD';
export const SET_UPDATE_AWARD = 'SET_UPDATE_AWARD';

import {setSnackBarMessage} from '../dashboard/action';

export function getAward() {
  return dispatch => {
    axiosev.get('/suppliers/awards').then(response => {
      // dispatch(setAward(response.data.data));
    });
  }
}

export function getAwardFromEventID(event_id) {
  return dispatch => {
    axiosev.get('/events/'+event_id+'/awards').then(response => {
      console.log(response);
      dispatch(setAwards(response.data.data));
    });
  }
}

export function createNewAwardFromEventID(event_id) {
  return dispatch => {
    axiosev.post('/events/'+event_id+'/awards').then(response => {
        dispatch(setAddNewAward(response.data.data));
    });
  }
}

export function setAwards(awards) {
  return {
    type: SET_AWARDS,
    awards
  }
}

export function setIsCreated(isCreated) {
  return {
      type: SET_IS_CREATED,
      isCreated
    }
}

export function setAddNewAward(award) {
  return dispatch => {
    dispatch({
      type: SET_ADD_NEW_AWARD,
      award
    })
  }
}

export function deleteAward(award, event_id) {
  return dispatch => {
    var awardID = award.award_id;
    if (awardID === null || awardID === undefined) {
      awardID = award._id;
    }

    axiosev.delete('events/'+event_id+'/awards/'+awardID)
    .then((response) => {
      var dataR = response.data;
      if (dataR === null || dataR.code !== 200) {
        dispatch(setSnackBarMessage("Xoá phần thưởng thất bại" , 3000)); 
        return;
      }
      dispatch(setSnackBarMessage("Xoá phần thưởng thành công" , 3000));
      dispatch(setDeleteAward(award));
      dispatch(setEditAward(null));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSnackBarMessage("Xoá phần thưởng thất bại" , 3000));
    });
  }
}

export function updateAward(award, event_id) {
  return dispatch => {
      var awardID = award.award_id;
      if (awardID === null) {
        awardID = award._id;
      }

      axiosev.put('events/'+event_id+'/awards/'+awardID, award)
      .then(response => {
        var dataR = response.data;
        if (dataR === null || dataR.code !== 200) {
          dispatch(setSnackBarMessage("Cập nhật phần thưởng thất bại" , 3000)); 
          return;
        }

        dispatch(setSnackBarMessage("Cập nhật phần thưởng thành công" , 3000));
        dispatch(setUpdateAward(award));
        dispatch(setEditAward(award));
      })
      .catch(error => {
        console.log(error);
        dispatch(setSnackBarMessage("Cập nhật phần thưởng thất bại" , 3000));
      })
    }
}

function setDeleteAward(award) {
  return {
    type: SET_DELETE_AWARD,
    award
  }
}

export function setEditAward(award) {
  return {
      type: SET_EDIT_AWARD,
      award
  }
}

export function setUpdateAward(award) {
  return {
      type: SET_UPDATE_AWARD,
      award
  }
}