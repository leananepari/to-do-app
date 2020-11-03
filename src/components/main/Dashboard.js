import React, { useState, useEffect } from 'react';
import TabsList from './TabsList';
import Display from './Display';
import { connect } from 'react-redux';
import { getTaskList, getCustomLists } from '../../redux/actions';

const Dashboard = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selected, setSelected] = useState("Tasks");

  useEffect(() => {
    //api call to get user's task list
    props.getTaskList(user.userid, props.history);

  }, [props.reload])

  return (
    <div className="dashboard-wrap">
      <TabsList selected={selected} setSelected={setSelected} />
      <Display selected={selected} setSelected={setSelected} />
    </div>
  )
} 

const mapStateToProps = state => {
  return {
    reload: state.reload,
  }
};

export default connect (
  mapStateToProps,
  { getTaskList, getCustomLists }
)(Dashboard)