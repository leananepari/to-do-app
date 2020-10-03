import React, { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import { withRouter } from 'react-router-dom';

const Header = ( props ) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const [dropdown, setDropdown] = useState(false);

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
      <div className="logo-header">
        <img src={Logo} style={{width: '35px'}}/>
        <h1>To-do</h1>
      </div>
      <div className="user-greeting">
        <h2>Hello, {user.username}</h2>
        <div className="dropdown-wrap">
          <FontAwesomeIcon onClick={handleDropdown} style={{width: '45px', 
                                                            height: '45px', 
                                                            cursor: 'pointer', 
                                                            color: 'lightgray'}} 
                                                    icon={faUserCircle} size='lg'/> 
          <div className="dropdown" style={{display: `${dropdown ? 'block' : 'none'}`, 
                                            position: 'absolute'}}>
            <div>Settings</div>
            <div onClick={handleLogout}>Logout</div>
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
