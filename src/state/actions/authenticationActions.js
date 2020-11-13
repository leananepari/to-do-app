import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';

export const LOGIN_START = 'LOGIN_START'; 
export const SET_USER = 'SET_USER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_START = 'SIGNUP_START'; 
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SET_LOGIN_FAILURE_FALSE = 'SET_LOGIN_FAILURE_FALSE';
export const SET_SIGNUP_FAILURE_FALSE = 'SET_SIGNUP_FAILURE_FALSE';


export const login = ( user, history ) => {

    return dispatch => {

      dispatch({ type: LOGIN_START });

      axiosWithAuth().post('/login', qs.stringify({ ...user, grant_type: 'password' }))
        .then(response => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("tokenType", response.data.token_type);
            return getUserInfo()();
        })
        .then(user => {
          dispatch({ type: SET_USER, payload: user });
          localStorage.setItem("user", JSON.stringify(user));
          history.push('/');
        })
        .catch(error => {
          dispatch({ type: LOGIN_FAILURE, payload: error })
        });
  }
};

export const signup = ( newUser, history ) => {

  return dispatch => {

    dispatch({ type: SIGNUP_START });

    axiosWithAuth().post('/createnewuser', newUser)
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tokenType", response.data.token_type);
      console.log('RESPONSE data', response)
      return getUserInfo()();

    })
    .then(user => {
      dispatch({ type: SET_USER, payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      history.push('/');
    })
    .catch(error => {
      console.log('Error', error)
      dispatch({ type: SIGNUP_FAILURE })
    });
  }
}

const getUserInfo = () => () => {

  return new Promise((resolve, reject) => {
    axiosWithAuth().get('/users/getuserinfo')
      .then(response => {
        resolve( response.data );
      })
      .catch(error => {
        console.log('Could not get user info', error);
        reject( error );
      });
  });
};

export const logout = ( history ) => {
  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('user');
    history.push("/login");
  }
}


export const setLoginFailureFalse = () => {
  return dispatch => {
    dispatch({ type: SET_LOGIN_FAILURE_FALSE })
  }
}

export const setSignupFailureFalse = () => {
  return dispatch => {
    dispatch({ type: 'SET_SIGNUP_FAILURE_FALSE' })
  }
}