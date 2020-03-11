import React from 'react';
import Logo from '../../assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  return (
    <header>
      <div className="logo-header">
        <img src={Logo} style={{width: '35px'}}/>
        <h1>To-do</h1>
      </div>
      <div className="user-greeting">
        <h2>Hello, User</h2>
        <FontAwesomeIcon style={{width: '45px', height: '45px', cursor: 'pointer', color: 'lightgray'}} icon={faUserCircle} size='lg'/> 
      </div>
    </header>
  )
}

export default Header;