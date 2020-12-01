import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../../../../state/actions';

import { ReactComponent as ThreeDotsIcon } from '../../../../../assets/three-dots-icon.svg';


const Title = ( props ) => {

  const handleChange = ( event ) => {
    props.setListNameInput( { ...props.listNameInput, [event.target.name]: event.target.value } );
  }

  const handleListNameUpdateSubmit = e => {

    e.preventDefault();

    let list = {...props.customListLookupByName[props.selectedTab]};
    list["name"] = props.listNameInput.name;
    props.updateCustomList(list);
    props.setEditListName(false);
    props.setSelectedTab(list["name"]);
  }


  const handleMoreDropdown = () => {
    props.setMoreDropdown(!props.moreDropdown);
  }

  return (
    <div className="title-wrap">
      {props.editListName 

        ? 
          <form onSubmit={handleListNameUpdateSubmit}>
            <input 
              autoFocus
              type="text"
              name="name"
              value={props.listNameInput.name} 
              onChange={handleChange} 
              autoComplete="off"
              
            />
          </form>
        :
          <div className="title"
              style={{color: `${props.selectedTab !== "My Day" ? "#3F6AE3" : "#34383C"}`}}>
              {props.selectedTab}
          </div>
      }

      {props.selectedTab !== "My Day" 
        && props.selectedTab !== "Important" 
        && props.selectedTab !== "Planned" 
        && props.selectedTabTab !== "Tasks" 

        ?
          
          <ThreeDotsIcon 
              onClick={handleMoreDropdown} 
              className="more-icon"
          />
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
    customListLookupByName: state.dashboard.customListLookupByName,
    moreDropdown: state.dashboard.moreDropdown,
    editListName: state.dashboard.editListName,
    listNameInput: state.dashboard.listNameInput
  }),
  {
    setMoreDropdown: dashboard.setMoreDropdown,
    updateCustomList: dashboard.updateCustomList,
    setSelectedTab: dashboard.setSelectedTab,
    setEditListName: dashboard.setEditListName,
    setListNameInput: dashboard.setListNameInput
  }
)(Title);