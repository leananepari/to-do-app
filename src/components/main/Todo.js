import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStar as starSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as starOutline} from '@fortawesome/free-regular-svg-icons';
import { category_lookup } from '../../data';
import { connect } from 'react-redux';
import { updateTask, deleteTask, setSelectedTodo, setSlideWindow, setEditTodo } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import closeIcon from '../../assets/x-icon.svg';

const Todo = ( props ) => {

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
    props.todo['important'] = !props.todo['important'];
    props.updateTask(props.todo);
  }

  const handleSelectedTodo = () => {
    props.setSelectedTodo(props.todo);
    props.setEditTodo(props.todo);
    if (props.slideWindow === false) {
      props.setSlideWindow(true);
    }
  }

  return (
    <div className="todo" style={{ backgroundColor: `${props.selectedTodo !== "" && props.selectedTodo.task_id === props.todo.task_id && props.slideWindow ? "#F7F7F7" : 'transparent'}`}}>

      {props.todo.completed ? 
        <FontAwesomeIcon onClick={handleUnmarked} style={{width: '25px', height: '25px', 
                                                          cursor: 'pointer', color: '#69B100'}} 
                         icon={faCheckCircle} size='lg'/> 
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text" onClick={handleSelectedTodo}>
        <div style={{textDecoration: `${props.todo.completed ? 'line-through' : 'none'}`}}>
             {props.todo['description']}
        </div>
        <div className="category">{category_lookup[props.todo['category_id_fk'].toString()]}</div>
      </div>
      {props.todo.completed ? 
        <img src={closeIcon} onClick={handleDelete} style={{width: '10px', height: '10px', cursor: 'pointer', color: 'gray', margin: '0 auto', marginRight: '0px'}}/>
        :
        <FontAwesomeIcon onClick={handleImportant} className={props.todo.important ? "star" : "none"} 
                         style={{width: '20px', height: '20px', 
                                 cursor: 'pointer', 
                                 color: `${props.todo.important ? '#FFFF33' : 'gray'}`, 
                                 margin: '0 auto', marginRight: '0px'}} 
                         icon={props.todo.important ? starSolid : starOutline} size='lg'/> 
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reload: state.reload,
    selectedTodo: state.selectedTodo,
    slideWindow: state.slideWindow
  }
}

export default withRouter(connect(
  mapStateToProps,
  { updateTask, deleteTask, setSelectedTodo, setSlideWindow, setEditTodo }
)(Todo))