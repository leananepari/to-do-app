import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Todo = ( { todo, updateTodo, deleteTodo } ) => {
  // const [completed, setCompleted] = useState(todo.completed)

  useEffect(() => {
    console.log('todo', todo)
  }, [todo])

  const handleMarked = () => {
    updateTodo(todo.id)
  }

  const handleUnmarked = () => {
    updateTodo(todo.id)
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  return (
    <div className="todo">

      {todo.completed ? 
        <FontAwesomeIcon onClick={handleUnmarked} style={{width: '25px', height: '25px', cursor: 'pointer', color: '#69B100'}} icon={faCheckCircle} size='lg'/> 
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text">
        <div style={{textDecoration: `${todo.completed ? 'line-through' : 'none'}`}}>{todo['to-do']}</div>
        <div className="category">{todo['category']}</div>
      </div>
      {todo.completed ? 
        <FontAwesomeIcon onClick={handleDelete} style={{width: '25px', height: '25px', cursor: 'pointer', color: 'gray', margin: '0 auto', marginRight: '0px'}} icon={faTimesCircle} size='lg'/> 
        :
        <></>
      }
    </div>
  )
}

export default Todo;