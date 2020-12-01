import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo-blue-icon.svg';
import { connect } from 'react-redux';
import { authentication } from '../../state/actions';

const Login = (props) => {
  const [user, setUser] = useState({'username': "", 'password': ""});

  const handleChange = (event) => {
    props.setLoginFailureFalse();
    setUser({...user, [event.target.name]: event.target.value })
  }

  const handleSignUpClick = () => {
    props.history.push('/signup')
  }

  const handleLogin = (e) => {
    e.preventDefault();
    props.login(user, props.history);
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
              <div className="login-failure-message" style={{visibility: `${props.loginFailure ? 'visible' : 'hidden'}`}}>Invalid Credentials</div>
              <input 
                autoFocus
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
              <button className="btn-login" type="submit" onClick={handleLogin}>Login</button>
            </form>
            <div className="sign-up-message">
              Don't have an account? 
              <button onClick={handleSignUpClick}>Create</button>
            </div>
          </div>
        </div>
      )
  }}
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    loginFailure: state.authentication.loginFailure,
    isLoading: state.authentication.isLoading
  }
};

export default connect (
  mapStateToProps,
  { login: authentication.login, 
    setLoginFailureFalse: authentication.setLoginFailureFalse }
)(Login)