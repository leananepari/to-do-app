import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faStar as starSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as starOutline} from '@fortawesome/free-regular-svg-icons';
import { category_lookup } from '../../data';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/actions';
import { withRouter } from 'react-router-dom';

const Todo = ( props ) => {
console.log("PROPS", props)
  useEffect(() => {

  }, [props.todo, props.reload])

  const handleMarked = () => {
    props.todo['completed'] = !props.todo['completed'];
    props.updateTask(props.todo, props.history)
  }

  const handleUnmarked = () => {
    props.todo['completed'] = !props.todo['completed'];
    props.updateTask(props.todo, props.history)
  }

  const handleDelete = () => {
    props.deleteTask(props.todo.task_id, props.history)
  }

  const handleImportant = () => {
    props.setImportant(props.todo)
  }

  return (
    <div className="todo">

      {props.todo.completed ? 
        <FontAwesomeIcon onClick={handleUnmarked} style={{width: '25px', height: '25px', cursor: 'pointer', color: '#69B100'}} icon={faCheckCircle} size='lg'/> 
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text">
        <div style={{textDecoration: `${props.todo.completed ? 'line-through' : 'none'}`}}>{props.todo['description']}</div>
        <div className="category">{category_lookup[props.todo['category_id_fk'].toString()]}</div>
      </div>
      {props.todo.completed ? 
        <FontAwesomeIcon onClick={handleDelete} style={{width: '20px', height: '20px', cursor: 'pointer', color: 'gray', margin: '0 auto', marginRight: '0px'}} icon={faTimesCircle} size='lg'/> 
        :
        <FontAwesomeIcon onClick={handleImportant} className={props.todo.important ? "star" : "none"} style={{width: '20px', height: '20px', cursor: 'pointer', color: `${props.todo.important ? '#FFFF33' : 'gray'}`, margin: '0 auto', marginRight: '0px'}} icon={props.todo.important ? starSolid : starOutline} size='lg'/> 
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reload: state.reload
  }
}

export default withRouter(connect(
  mapStateToProps,
  { updateTask, deleteTask }
)(Todo))