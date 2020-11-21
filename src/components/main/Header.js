import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as UserIcon } from '../../assets/user-icon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout-icon.svg';
import { ReactComponent as up_chevron } from '../../assets/up-chevron.svg';
import { ReactComponent as down_chevron } from '../../assets/down-chevron-white.svg';

import { connect } from 'react-redux';
import { authentication } from '../../state/actions';
import { withRouter } from 'react-router-dom';

const Header = ( props ) => {
  const [dropdown, setDropdown] = useState(false);
  const container = React.createRef();
  const ChevronIcon = dropdown ? up_chevron : down_chevron;

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
      <Link to={"/"} className="logo-header">
        <Logo className="logo-icon" />
        <h1>To Do</h1>
      </Link>
      <div className="right-side">
        <div className="dropdown-wrap" ref={container}>
          <ChevronIcon className="chevron-icon" onClick={handleDropdown}/>
          <div className="dropdown" style={{display: `${dropdown ? "block" : "none"}`, 
                                            position: "absolute"}}>
            <div className="triangle">
              <div></div>
              <div></div>
              <div>
                <div className="triangle-up"></div>
              </div>
            </div>
            <Link to={"/profile"} className="text">
              <UserIcon className="icon"/>
              Profile
            </Link>
            <Link to={"/settings"} className="text">
              <SettingsIcon  className="icon settings" />
              Settings
            </Link>
            <div className="text last" onClick={handleLogout}>
              <LogoutIcon className="icon" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const headerWithRouter = withRouter(Header);

export default connect(
  state => ({
    authentication: state.authentication,
  }),
  { logout: authentication.logout}
)(headerWithRouter);
