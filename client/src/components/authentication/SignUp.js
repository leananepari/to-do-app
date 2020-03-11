import React, { useState } from 'react';
import Logo from '../../assets/Logo.svg';

const SignUp = (props) => {
  const [newUser, setNewUser] = useState({"first_name": "", "last_name": "", "email": "", "password": ""})

  const handleSignUp = () => {

  }

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
          name="first_name"
          value={newUser.first_name}
          onChange={handleChange}
          placeholder="Your first name"
        />
        <input 
          type="text"
          name="last_name"
          value={newUser.last_name}
          onChange={handleChange}
          placeholder="Your last name"
        />
        <input 
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Your email"
        />
        <input 
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Your password"
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