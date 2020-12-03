import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { dashboard } from '../../../../../state/actions';

import { ReactComponent as TrashIconRed } from '../../../../../assets/trash-icon-red.svg';
import { ReactComponent as RenameIcon } from '../../../../../assets/rename-icon.svg';


const Dropdown = ( props ) => {
  const history = useHistory();

  const handleRenameCustomList = () => {
    props.setListNameInput({"name": props.selectedTab});
    props.setEditListName(true);
    props.setMoreDropdown(false);
  }

  const handleDeleteCustomList = () => {
    props.setMoreDropdown(false);
    props.setModalTrue(props.customListLookupByName[props.selectedTab]["list_id"], props.selectedTab,
                      props.deleteCustomList, history)
  }
  

  return (
    <div className="more-dropdown" 
        style={{display: `${props.moreDropdown ? "block" : "none"}`}}>

      <div className="options">
        {props.selectedTab === "Important" 
        || props.selectedTab === "Planned" ? "Options" : "List options"}
      </div>

      {props.selectedTab !== "My Day" 
      && props.selectedTab !== "Important" 
      && props.selectedTab !== "Planned" 
      && props.selectedTab !== "Tasks" 
      
      ? 
          <div>
            <div className="option-wrap" onClick={handleRenameCustomList}>
              <RenameIcon className="icon" />
              <ul>Rename list</ul>
            </div>
            <div className="option-wrap" onClick={handleDeleteCustomList}>
              <TrashIconRed className="icon" />
              <ul style={{color: "#DB3B29"}}>Delete list</ul>
            </div>
          </div>
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
    moreDropdown: state.dashboard.moreDropdown
  }),
  {
    setMoreDropdown: dashboard.setMoreDropdown,
    setModalTrue: dashboard.setModalTrue,
    deleteCustomList: dashboard.deleteCustomList,
    setEditListName: dashboard.setEditListName,
    setListNameInput: dashboard.setListNameInput,
  }
)(Dropdown);