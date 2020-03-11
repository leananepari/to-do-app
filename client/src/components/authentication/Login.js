import React, { useState } from 'react';
import Logo from '../../assets/Logo.svg';

const Login = (props) => {
  const [user, setUser] = useState({'email': "", 'password': ""});

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value })
  }

  const handleSignUpClick = () => {
    props.history.push('/signup')
  }

  const handleLogin = () => {

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
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Your email"
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