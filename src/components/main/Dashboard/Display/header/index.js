import React from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import Title from './Title';
import DateComponent from './DateComponent';


const Header = ( props ) => {

  return (
    <div className="text-wrap" >

      <Title />
      <Dropdown reference={props.reference}/>

      {props.selectedTab === "My Day" 
      
      ?
        <DateComponent />
      :
        <></>
      }
  </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTab: state.dashboard.selectedTab,
  }),
  {}
)(Header);