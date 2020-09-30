import React, { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import { connect } from 'react-redux';
import { signup, setSignupFailureFalse } from '../../redux/actions';

const SignUp = (props) => {
  const [newUser, setNewUser] = useState({"username": "", "password": "", "primaryemail": ""})

  const handleSignUp = (e) => {
    e.preventDefault();
    props.signup(newUser, props.history)
  }

  const handleChange = (event) => {
    props.setSignupFailureFalse();
    setNewUser({...newUser, [event.target.name]: event.target.value })
  }

  const handleLoginClick = () => {
    props.history.push('/login')
  }

  return (
    <div className="login-page">
      <div className="login-box" >
        <div>
          <div className="logo-wrap">
            <img src={Logo} alt="logo" style={{width: '80px'}}/>
            <h1>To-do</h1>
          </div>
          <div className="subtitle">
            Your <span className="life">life</span> <span className="organized">organized</span>
          </div>
        </div>
        <form>
          <div className="login-failure-message" style={{visibility: `${props.signupFailure ? 'visible' : 'hidden'}`}}>{newUser.username} is already taken!</div>
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
        </form>
        <div className="sign-up-message">
          Already have an account? 
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    signupFailure: state.signupFailure
  }
};

export default connect (
  mapStateToProps,
  { signup, setSignupFailureFalse }
)(SignUp)