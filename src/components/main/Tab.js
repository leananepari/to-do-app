import React from 'react';
import { connect } from 'react-redux';

const Tab = ( props ) => {

  const handleClick = () => {
    props.setSelected(props.category)
    console.log('SELECTED: ', props.selected)
  }

  return (
    <div className="tab" onClick={handleClick} 
         style={{backgroundColor: `${props.selected === props.category ? '#EDEDED' : ''}`,
                 marginTop: `${props.category === 'My Day' ? '20px' : '0px'}`}}>
      <img src={props.icon} style={{height: '18px', width: '18px'}}/>
      <div style={{color: `${props.selected === props.category && props.category !== "My Day" ? "#3F6AE3" : "#34383C"}`, 
                   fontWeight: `${props.selected === props.category ? "500" : "200"}`}}>
          {props.category}
      </div>
      <div className="count" style={{color: '#1B1C21'}}>
          {props.categoryCount[props.category]}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    categoryCount: state.categoryCount,
  }
}

export default connect(
  mapStateToProps,
  { }
)(Tab)