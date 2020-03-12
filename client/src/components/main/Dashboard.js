import React, { useState, useEffect } from 'react';
import Header from './Header';
import { user, category_icons } from '../../data';
import TabsList from './TabsList';
import Display from './Display';

const Dashboard = () => {
  const [categories, setCategories] = useState(["My Day"]);
  const [categoriesCount, setCategoriesCount] = useState({});
  const [selected, setSelected] = useState("My Day");
  const [list, setList] = useState([]);

  useEffect(() => {
    //api call to get user's data 
    setList(user[0]['to-do-list']);

    //get todo's categories by traversing the todo list
    let categoriesSet = new Set();
    categoriesSet.add("My Day");
    let storeCount = {};
    storeCount["My Day"] = user[0]['to-do-list'].length;
    let countImportant = 0;

    user[0]['to-do-list'].forEach(todo => {
      categoriesSet.add(todo.category);
      if (storeCount.hasOwnProperty(todo.category)) {
        storeCount[todo.category] += 1;
      } else {
        storeCount[todo.category] = 1;
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

    setCategories(categoriesArr);
    setCategoriesCount(storeCount);

  }, [])

  const updateTodo = (id) => {
    //api call to update todo
    //get back the updated list and set it to state
    let updated = list.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
        return todo
      } else {
        return todo
      }
    })
    setList(updated);
  }

  const deleteTodo = (id) => {
    //api call to delete todo 
    //get back updated list and set it to state
    let updated = list.filter(todo => {
      if (todo.id !== id) {
        return todo
      }
    })
    setList(updated);
  }

  const addTodo = (newTodo) => {
    //api call to add a new todo
    //get back updated list and set it to state
    let newObj = {"id": list.length, "to-do": newTodo.to_do, "category": newTodo.category, "completed": false};
    let newArr = [...list];
    newArr.push(newObj);
    setList(newArr);
  }

  const setImportant = (id) => {
    //api call to update todo
    //get back the updated list and set it to state
    let updated = list.map(todo => {
      if (todo.id === id) {
        todo.important = !todo.important
        return todo
      } else {
        return todo
      }
    })
    setList(updated);
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