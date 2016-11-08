import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
// import setAuthorizationToken from '../utils/setAuthorizationToken';
// import jwtDecode from 'jwt-decode';
// import { SET_CURRENT_USER } from './types';
//
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


export function login(data){
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      console.log(jwtDecode(token));
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}
