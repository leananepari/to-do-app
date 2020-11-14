import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';

const Tab = ( props ) => {

  const handleClick = () => {
    if (props.selected !== props.category) {
      props.setSelected(props.category);
      props.setEditWindow(false);
    }
  }

  return (
    <div className="tab" onClick={handleClick} 
         style={{backgroundColor: `${props.selected === props.category ? '#EDEDED' : ''}`,
                 marginTop: `${props.category === 'My Day' ? '20px' : '0px'}`}}>
      <props.icon className="tab-icon"/>
      <div style={{color: `${props.selected === props.category && props.category !== "My Day" ? "#3F6AE3" : "#34383C"}`, 
                   fontWeight: `${props.selected === props.category ? "500" : "200"}`}}>
          {props.category}
      </div>
      <div className="count" style={{color: '#1B1C21'}}>
          {props.categoryCount[props.category] !== 0 ? props.categoryCount[props.category] : ''}
      </div>
    </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    categoryCount: state.dashboard.categoryCount,
    reload: state.dashboard.reload
  }),
  { setEditWindow: dashboard.setEditWindow }
)(Tab);