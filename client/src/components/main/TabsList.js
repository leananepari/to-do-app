import React from 'react';
import Tab from './Tab';
import { connect } from 'react-redux';

const TabsList = ( props ) => {

  return (
    <div className="tabs-list">
      {props.categories.map((category) => {
        return <Tab category={category} key={category} icon={props.icons[category]} 
                    selected={props.selected} setSelected={props.setSelected} 
                />
      })}
    </div>
  )
}


const mapStateToProps = state => {
  return {
    categories: state.categories,
  }
}

export default connect (
  mapStateToProps,
  {}
)(TabsList)