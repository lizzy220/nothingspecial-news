import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData).then(res => {
      const success = res.data.success;
      if(success === true){
        localStorage.setItem('signup', 'Sign up successfully! Please log in!');
      }
    });
  }
}
