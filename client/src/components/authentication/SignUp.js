import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import Logo from '../../assets/Logo.svg';

const SignUp = (props) => {
  const [newUser, setNewUser] = useState({"username": "", "password": "", "primaryemail": ""})

  const handleSignUp = () => {
    axiosWithAuth().post('/createnewuser', newUser)
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tokenType", response.data.token_type);
      console.log(response.data)
      return getUserInfo()();

    })
    .then(user => {
      console.log('Successful login', user);
      localStorage.setItem("user", JSON.stringify(user));
      props.history.push('/');
    })
    .catch(error => {
      console.log('Error', error)
    });
  }

  const getUserInfo = () => dispatch => {
    return new Promise((resolve, reject) => {
      axiosWithAuth().get('/users/getuserinfo')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.log('Could not get user info', error);
          reject(error);
        });
    });
  };

  const handleChange = (event) => {
    setNewUser({...newUser, [event.target.name]: event.target.value })
  }

  const handleLoginClick = () => {
    props.history.push('/login')
  }

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
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input 
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input 
          type="email"
          name="primaryemail"
          value={newUser.primaryemail}
          onChange={handleChange}
          placeholder="Your email"
        />

        <button className="btn-login" onClick={handleSignUp}>Sign Up</button>
      </div>
      <div className="sign-up-message">
        Already have an account? 
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  )
}

export default SignUp;