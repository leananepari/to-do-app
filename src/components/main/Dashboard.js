import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';
import Header from './Header';
import { user, category_icons } from '../../data';
import TabsList from './TabsList';
import Display from './Display';
import { category_lookup } from '../../data';
import { connect } from 'react-redux';
import { getTaskList } from '../../redux/actions';

const Dashboard = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [categories, setCategories] = useState(["My Day"]);
  const [categoriesCount, setCategoriesCount] = useState({});
  const [selected, setSelected] = useState("My Day");
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    //api call to get user's task list
    props.getTaskList(user.userid, props.history)

  }, [props.reload])


  const addTodo = (newTodo) => {
    //api call to add a new todo
    //get back updated list and set it to state
    newTodo["user_id_fk"] = user.userid;

    axiosWithAuth().post('/api/tasks/add', newTodo)
    .then(response => {
      setReload(!reload);
    })
    .catch(error => {
      console.log('Error', error);
      localStorage.removeItem('token');
      localStorage.removeItem('tokenType');
      props.history.push('/login');
    });

  }

  const setImportant = (todo) => {
    //api call to update todo
    //get back the updated list and set it to state
    todo['important'] = !todo['important']
    axiosWithAuth().put('/api/tasks/update', todo)
    .then(response => {
      setReload(!reload);
    })
    .catch(error => {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenType');
      props.history.push('/login');
    });
  }

  return (
    <>
    <Header />
    <div className="dashboard-wrap">
      <TabsList categories={categories} icons={category_icons} selected={selected} setSelected={setSelected} categoriesCount={categoriesCount}/>
      <Display list={props.taskList} selected={selected} addTodo={addTodo} setImportant={setImportant}/>
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
  { getTaskList }
)(Dashboard)