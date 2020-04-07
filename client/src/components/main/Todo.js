import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faStar as starSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as starOutline} from '@fortawesome/free-regular-svg-icons';
import { category_lookup } from '../../data';

const Todo = ( { todo, updateTodo, deleteTodo, setImportant } ) => {

  useEffect(() => {
    console.log('todo', todo)
  }, [todo])

  const handleMarked = () => {
    updateTodo(todo)
  }

  const handleUnmarked = () => {
    updateTodo(todo)
  }

  const handleDelete = () => {
    deleteTodo(todo.task_id)
  }

  const handleImportant = () => {
    setImportant(todo)
  }

  return (
    <div className="todo">

      {todo.completed ? 
        <FontAwesomeIcon onClick={handleUnmarked} style={{width: '25px', height: '25px', cursor: 'pointer', color: '#69B100'}} icon={faCheckCircle} size='lg'/> 
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text">
        <div style={{textDecoration: `${todo.completed ? 'line-through' : 'none'}`}}>{todo['description']}</div>
        <div className="category">{category_lookup[todo['category_id_fk'].toString()]}</div>
      </div>
      {todo.completed ? 
        <FontAwesomeIcon onClick={handleDelete} style={{width: '20px', height: '20px', cursor: 'pointer', color: 'gray', margin: '0 auto', marginRight: '0px'}} icon={faTimesCircle} size='lg'/> 
        :
        <FontAwesomeIcon onClick={handleImportant} className={todo.important ? "star" : "none"} style={{width: '20px', height: '20px', cursor: 'pointer', color: `${todo.important ? '#FFFF33' : 'gray'}`, margin: '0 auto', marginRight: '0px'}} icon={todo.important ? starSolid : starOutline} size='lg'/> 
      }
    </div>
  )
}

export default Todo;