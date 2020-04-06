import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';
import Logo from '../../assets/Logo.svg';

const Login = (props) => {
  const [user, setUser] = useState({'username': "", 'password': ""});

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value })
  }

  const handleSignUpClick = () => {
    props.history.push('/signup')
  }

  const handleLogin = () => {
    axiosWithAuth().post('/login', qs.stringify({ ...user, grant_type: 'password' }))
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tokenType", response.data.token_type);

      console.log(response.data)

      return getUserInfo()();
    })
    .then(user => {
      // dispatch({ type: LOGIN_RESULT, payload: { success: true, user } });
      console.log('Successful login', user);
    })
    .catch(error => {
      console.log('Login failed', error);
    });
  }

  const getUserInfo = () => dispatch => {
    return new Promise((resolve, reject) => {
      axiosWithAuth().get('/users/getuserinfo')
        .then(response => {
          // dispatch({ type: USER_INFO_FETCH_SUCCESS, payload: response.data });
          resolve(response.data);
        })
        .catch(error => {
          console.log('Could not get user info', error);
          reject(error);
        });
    });
  };

  return (
    <div className="login-page" >
      <div className="logo-wrap">
        <img src={Logo} style={{width: '120px'}}/>
        <h1>To-do</h1>
      </div>
      <div className="subtitle">
        Your <span className="life">life</span> <span className="organized">organized</span>
      </div>
      <div className="input-wrap">
        <input 
          type="email"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Your username"
        />
        <input 
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Your password"
        /> 
        <button className="btn-login" onClick={handleLogin}>Login</button>
      </div>
      <div className="sign-up-message">
        Don't have an account? 
        <button onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </div>
  )
}

export default Login;