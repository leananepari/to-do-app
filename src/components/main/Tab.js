import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

const Tab = ( props ) => {

  const handleClick = () => {
    props.setSelected(props.category)
  }

  return (
    <div className="tab" onClick={handleClick}>
      <FontAwesomeIcon style={{width: '20px', height: '20px', color: `${props.selected === props.category ? '#0EA4E0' : 'gray'}`}} 
                       icon={props.icon} size='lg'/> 
      <div style={{color: `${props.selected === props.category ? '#0EA4E0' : 'gray'}`}}>{props.category}</div>
      <div className="count" style={{color: `${props.selected === props.category ? '#0EA4E0' : 'gray'}`}}>
                             {props.categoryCount[props.category]}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    categoryCount: state.categoryCount
  }
}

export default connect(
  mapStateToProps,
  { }
)(Tab)