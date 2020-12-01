import React, { useEffect } from 'react';
import TabsList from './TabsList';
import Display from './Display';
import { connect } from 'react-redux';
import { dashboard } from '../../../state/actions';

const Dashboard = ( props ) => {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (props.taskList.length === 0) {
      props.getTaskList(user.userid, props.history);
    }

  }, [])

  return (
    <div className="dashboard-wrap">
      <TabsList />
      <Display />
    </div>
  )
} 


export default connect(
  state => ({
    dashboard: state.dashboard,
    taskList: state.dashboard.taskList
  }),
  { getTaskList: dashboard.getTaskList }
)(Dashboard);