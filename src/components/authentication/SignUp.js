import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../../assets/logo-blue-icon.svg';
import { connect } from 'react-redux';
import { authentication } from '../../state/actions';

const SignUp = (props) => {
  const [newUser, setNewUser] = useState({"username": "", "password": "", "primaryemail": ""})

  useEffect(() => {
    props.isAuthenticated(props.history);
  }, [])

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

  {if (props.isLoading) {
    return <div className="loader-wrap"><div className="loader"></div></div>
  } else {

    return (
      <div className="login-page">
        <div className="login-box" >
          <div>
            <div className="logo-wrap">
              <Logo className="logo-icon"/>
              <h1>To Do</h1>
            </div>
            <div className="subtitle">
              Your <span className="life">life</span> <span className="organized">organized</span>
            </div>
          </div>
          <form>
            <div className="login-failure-message" style={{visibility: `${props.signupFailure ? 'visible' : 'hidden'}`}}>{newUser.username} is already taken!</div>
            <input 
              autoFocus
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
 }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    signupFailure: state.authentication.signupFailure,
    isLoading: state.authentication.isLoading
  }
};

export default connect (
  mapStateToProps,
  { signup: authentication.signup, 
    setSignupFailureFalse: authentication.setSignupFailureFalse,
    isAuthenticated: authentication.isAuthenticated
  }
)(SignUp)