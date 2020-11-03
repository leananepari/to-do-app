import React from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask, setSelectedTodo, setEditWindow, setEditTodo } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import checkmark_icon from '../../assets/checkmark-icon.svg';
import star_icon from '../../assets/star-icon.svg';
import star_solid_icon from '../../assets/star-solid-icon.svg';

const Todo = ( props ) => {

  const handleMarked = () => {
    props.todo['completed'] = !props.todo['completed'];
    if (props.selectedTodo !== '' && props.selectedTodo.task_id === props.todo.task_id) {
      props.selectedTodo['completed'] = !props.selectedTodo['completed'];
    }
    props.updateTask(props.todo, props.history)
  }

  const handleUnmarked = () => {
    props.todo['completed'] = !props.todo['completed'];
    if (props.selectedTodo !== '' && props.selectedTodo.task_id === props.todo.task_id) {
      props.selectedTodo['completed'] = !props.selectedTodo['completed'];
    }
    props.updateTask(props.todo, props.history)
  }

  const handleImportant = () => {
    props.todo['important'] = !props.todo['important'];
    if (props.selectedTodo !== '' && props.selectedTodo.task_id === props.todo.task_id) {
      props.selectedTodo['important'] = !props.selectedTodo['important'];
    }
    props.updateTask(props.todo, props.history);
  }

  const handleSelectedTodo = () => {
    props.setSelectedTodo(props.todo);
    props.setEditTodo(props.todo);
    if (props.editWindow === false) {
      props.setEditWindow(true);
    }
  }

  return (
    <div className="todo" 
      style={{ backgroundColor: `${props.selectedTodo !== "" && props.selectedTodo.task_id === props.todo.task_id && props.editWindow ? "#F3F6FF": ''}`}}>

      {props.todo.completed ? 
        <img src={checkmark_icon} alt="checkmark icon"
             style={{width: '18px', cursor: 'pointer'}} 
             onClick={handleUnmarked}/>
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text" onClick={handleSelectedTodo}>
        <div style={{textDecoration: `${props.todo.completed ? 'line-through' : 'none'}`}}>
             {props.todo['description']}
        </div>
        {/* <div className="category">{category_lookup[props.todo['category_id_fk'].toString()]}</div> */}
      </div>
        {props.todo.important ? 
          <img src={star_solid_icon} onClick={handleImportant} alt="star solid icon"
               style={{width: '16px', cursor: 'pointer', margin: '0 auto', marginRight: '0px'}}/>
        :
          <img src={star_icon} onClick={handleImportant} alt="star icon"
               style={{width: '16px', cursor: 'pointer', margin: '0 auto', marginRight: '0px'}}/>
        }
      <div className="border"></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reload: state.reload,
    selectedTodo: state.selectedTodo,
    editWindow: state.editWindow
  }
}

export default withRouter(connect(
  mapStateToProps,
  { updateTask, deleteTask, setSelectedTodo, setEditWindow, setEditTodo }
)(Todo))