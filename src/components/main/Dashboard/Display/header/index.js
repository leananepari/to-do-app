import React from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import Title from './Title';
import DateComponent from './DateComponent';
import OutsideClickHandler from '../../../../../utils/OutsideClickHandler';
import { dashboard } from '../../../../../state/actions';


const Header = ( props ) => {

  const handleOutsideClickDropdown = () => {
    props.setMoreDropdown(false);
    props.setEditListName(false);
  }

  return (
    <OutsideClickHandler callback={handleOutsideClickDropdown}>
      <div className="text-wrap" >

        <Title />
        <Dropdown />

        {props.selectedTab === "My Day" 
        
        ?
          <DateComponent />
        :
          <></>
        }
      </div>
    </OutsideClickHandler>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTab: state.dashboard.selectedTab,
  }),
  {
    setMoreDropdown: dashboard.setMoreDropdown,
    setEditListName: dashboard.setEditListName
  }
)(Header);