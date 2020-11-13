import React, { useState, useEffect } from 'react';
import TabsList from './TabsList';
import Display from './Display';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';

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


export default connect(
  state => ({
    dashboard: state.dashboard,
    reload: state.dashboard.reload
  }),
  { getTaskList: dashboard.getTaskList }
)(Dashboard);