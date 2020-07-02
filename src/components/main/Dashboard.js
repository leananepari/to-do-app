import React, { useState, useEffect } from 'react';
import Header from './Header';
import TabsList from './TabsList';
import Display from './Display';
import { connect } from 'react-redux';
import { getTaskList, addTask, updateTask } from '../../redux/actions';

const Dashboard = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selected, setSelected] = useState("My Day");

  useEffect(() => {
    //api call to get user's task list
    props.getTaskList(user.userid, props.history)

  }, [props.reload])


  const addTodo = (newTodo) => {
    //api call to add a new todo
    //get back updated list and set it to state
    newTodo["user_id_fk"] = user.userid;
    props.addTask(newTodo)
  }

  const setImportant = (todo) => {
    //api call to update todo
    //get back the updated list and set it to state
    todo['important'] = !todo['important'];
    props.updateTask(todo);
  }

  return (
    <>
    <Header />
    <div className="dashboard-wrap">
      <TabsList selected={selected} setSelected={setSelected} />
      <Display list={props.taskList} selected={selected} addTodo={addTodo} setImportant={setImportant} />
    </div>
    </>
  )
} 

const mapStateToProps = state => {
  return {
    taskList: state.taskList,
    reload: state.reload
  }
};

export default connect (
  mapStateToProps,
  { getTaskList, addTask, updateTask }
)(Dashboard)