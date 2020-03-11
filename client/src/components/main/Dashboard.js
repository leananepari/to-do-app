import React, { useState, useEffect } from 'react';
import Header from './Header';
import { user, category_icons } from '../../data';
import TabsList from './TabsList';
import Display from './Display';

const Dashboard = () => {
  const [categories, setCategories] = useState(["My Day"]);
  const [selected, setSelected] = useState("My Day");
  const [list, setList] = useState([]);

  useEffect(() => {
    //api call to get user's data 
    setList(user[0]['to-do-list']);

    //get todo's categories by traversing the todo list
    let categoriesSet = new Set();
    categoriesSet.add("My Day")

    user[0]['to-do-list'].forEach(todo => {
      categoriesSet.add(todo.category)
    });
    //convert set to array
    let categoriesArr = Array.from(categoriesSet)
    setCategories(categoriesArr);
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

  return (
    <div className="dashboard-wrap">
      <Header />
      <TabsList categories={categories} icons={category_icons} selected={selected} setSelected={setSelected}/>
      <Display list={list} selected={selected} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
    </div>
  )
} 

export default Dashboard;