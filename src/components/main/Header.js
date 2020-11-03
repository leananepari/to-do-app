import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import userIcon from '../../assets/user-icon.svg';
import settingsIcon from '../../assets/settings.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import up_chevron from '../../assets/up-chevron.svg';
import down_chevron from '../../assets/down-chevron.svg';

const Header = ( props ) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const [dropdown, setDropdown] = useState(false);
  const container = React.createRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  })

  const handleClick = e => {
    if (container.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setDropdown(false)
  };

  const handleLogout = () => {
    props.logout(props.history);
  }

  const handleDropdown = () => {
    if (dropdown) {
      setDropdown(false)
    } else {
      setDropdown(true)
    }
  }

  return (
    <header>
      <Link to={'/'} className="logo-header">
        <img src={Logo} style={{width: '28px'}} alt="logo"/>
        <h1>To Do</h1>
      </Link>
      <div className="right-side">
        <div className="dropdown-wrap" ref={container}>
          <img alt="up or down chevron" src={dropdown ? up_chevron : down_chevron} style={{width: '18px', cursor: 'pointer'}} onClick={handleDropdown}/>
          <div className="dropdown" style={{display: `${dropdown ? 'block' : 'none'}`, 
                                            position: 'absolute'}}>
            <div className="triangle">
              <div></div>
              <div></div>
              <div>
                <div className="triangle-up"></div>
              </div>
            </div>
            <Link to={'/profile'} className="text">
              <img src={userIcon} alt="user icon"/>
              Profile
            </Link>
            <Link to={'/settings'} className="text">
              <img src={settingsIcon} className="settings-icon" alt="settings icon"/>
              Settings
            </Link>
            <div className="text last" onClick={handleLogout}>
              <img src={logoutIcon} alt="logout icon"/>
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const headerWithRouter = withRouter(Header);
const mapStateToProps = state => {
  return {
    taskList: state.taskList,
    reload: state.reload
  }
};

export default connect (
  mapStateToProps,
  { logout }
)(headerWithRouter)
