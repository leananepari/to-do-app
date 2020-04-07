import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';
import Header from './Header';
import { user, category_icons } from '../../data';
import TabsList from './TabsList';
import Display from './Display';
import { category_lookup } from '../../data';

const Dashboard = (props) => {
  const user2 = JSON.parse(localStorage.getItem('user'));
  console.log('USER LOCAL STORAGE', user2.userid);
  const [categories, setCategories] = useState(["My Day"]);
  const [categoriesCount, setCategoriesCount] = useState({});
  const [selected, setSelected] = useState("My Day");
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    //api call to get user's data 

    axiosWithAuth().get(`/api/tasks/all/${user2.userid}`, qs.stringify({ grant_type: 'password' }))
    .then(response => {
      console.log(response.data)
      let list = response.data;

      //get todo's categories by traversing the todo list
      let categoriesSet = new Set();
      categoriesSet.add("My Day");
      let storeCount = {};
      storeCount["My Day"] = list.length;
      let countImportant = 0;

      list.forEach(todo => {
        categoriesSet.add(category_lookup[todo.category_id_fk.toString()]);
        if (storeCount.hasOwnProperty(category_lookup[todo.category_id_fk.toString()])) {
          storeCount[category_lookup[todo.category_id_fk.toString()]] += 1;
        } else {
          storeCount[category_lookup[todo.category_id_fk.toString()]] = 1;
        }
        if (todo.important === true) {
          countImportant ++;
        }
      });
      //convert set to array
      let categoriesArr = Array.from(categoriesSet);
      if (countImportant > 0) {
        storeCount["Important"] = countImportant;
        categoriesArr.push("Important");
      }
      console.log('CATEGORIES HERE', categoriesArr)
      setList(list);
      setCategories(categoriesArr);
      setCategoriesCount(storeCount);
    })
    .catch(error => {
      console.log('Error', error);
      localStorage.removeItem('token');
      localStorage.removeItem('tokenType');
      props.history.push('/login');
    });

  }, [reload])

  const updateTodo = (todo) => {
    //api call to update todo
    //get back the updated list and set it to state
    todo['completed'] = !todo['completed'];
    console.log('UPDATED TODO', todo)
    axiosWithAuth().put('/api/tasks/update', todo)
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

  const deleteTodo = (id) => {
    //api call to delete todo 
    //get back updated list and set it to state

    axiosWithAuth().delete(`/api/tasks/delete/${id}`)
    .then(response => {
      console.log(response.data)
      setReload(!reload);
    })
    .catch(error => {
      console.log('Error', error);
      localStorage.removeItem('token');
      localStorage.removeItem('tokenType');
      props.history.push('/login');
    });

  }

  const addTodo = (newTodo) => {
    //api call to add a new todo
    //get back updated list and set it to state
    newTodo["user_id_fk"] = user2.userid;

    console.log('TODO', newTodo)
    axiosWithAuth().post('/api/tasks/add', newTodo)
    .then(response => {
      console.log(response.data)
      // setList(response.data);
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
      console.log(response.data)
      setReload(!reload);
    })
    .catch(error => {
      console.log('Error', error);
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
      <Display list={list} selected={selected} updateTodo={updateTodo} deleteTodo={deleteTodo} addTodo={addTodo} setImportant={setImportant}/>
    </div>
    </>
  )
} 

export default Dashboard;