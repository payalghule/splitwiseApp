import { GET_USER, UPDATE_USER } from './types';
import backendServer from '../../backEndConfig';
import axios from 'axios';

export const getUser = (user) => (dispatch) => {
  axios
    .post(`${backendServer}/profile/getuserprofile`, user)
    .then((response) => response.data[0])
    .then((userData) =>
      dispatch({
        type: GET_USER,
        payload: userData,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser = (userProfileData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/profile/updateuser`, userProfileData)
    .then((response) => response.data)
    .then((data) => {
      if (data === 'USER_UPDATED') {
        localStorage.setItem('username', userProfileData.username);
        alert('Profile Updated Successfully!');
      }
      return dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
