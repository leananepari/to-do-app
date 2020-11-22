import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';

const Tab = ( props ) => {

  const handleClick = () => {
    if (props.selectedTab !== props.category) {
      props.setSelectedTab(props.category);
      props.setEditWindow(false);
    }
  }

  return (
    <div className="tab" onClick={handleClick} 
         style={{backgroundColor: `${props.selectedTab === props.category ? "#EDEDED" : ""}`,
                 marginTop: `${props.category === "My Day" ? "20px" : "0px"}`}}>
      <props.icon className="tab-icon"/>
      <div style={{color: `${props.selectedTab === props.category && props.category !== "My Day" ? "#3F6AE3" : "#34383C"}`, 
                   fontWeight: `${props.selectedTab === props.category ? "500" : "200"}`}}>
          {props.category}
      </div>
      <div className="count" style={{color: "#1B1C21"}}>
          {props.count !== 0 ? props.count : ""}
      </div>
    </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTab: state.dashboard.selectedTab
  }),
  { setEditWindow: dashboard.setEditWindow,
    setSelectedTab: dashboard.setSelectedTab }
)(Tab);