import axiosev from '../../axiosev';

export const SET_AWARD = 'SET_AWARD';
export const GET_AWARD = 'GET_AWARD';

export function getAwards() {
  return dispatch => {
    axiosev.get('/suppliers/awards').then(response => {
      dispatch(setAward(response.data.data));
    });
  };
};

export function setAward(awards) {
  return {
    type: SET_AWARD,
    awards
  }
}
