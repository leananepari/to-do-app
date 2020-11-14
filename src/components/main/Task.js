import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';
import { ReactComponent as StarIcon } from '../../assets/star-icon.svg';
import { ReactComponent as StarSolidIcon } from '../../assets/star-solid-icon.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/checkmark-icon.svg';

const Task = ( props ) => {

  const handleMarked = () => {
    props.task['completed'] = !props.task['completed'];
    if (props.selectedTask !== '' && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask['completed'] = !props.selectedTask['completed'];
    }
    props.updateTask(props.task, props.history)
  }

  const handleUnmarked = () => {
    props.task['completed'] = !props.task['completed'];
    if (props.selectedTask !== '' && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask['completed'] = !props.selectedTask['completed'];
    }
    props.updateTask(props.task, props.history)
  }

  const handleImportant = () => {
    props.task['important'] = !props.task['important'];
    if (props.selectedTask !== '' && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask['important'] = !props.selectedTask['important'];
    }
    props.updateTask(props.task, props.history);
  }

  const handleSelectedTask = () => {
    props.setSelectedTask(props.task);
    props.setEditTask(props.task);
    if (props.editWindow === false) {
      props.setEditWindow(true);
    }
  }

  return (
    <div className="todo" 
      style={{ backgroundColor: `${props.selectedTask !== "" && props.selectedTask.task_id === props.task.task_id && props.editWindow ? "#F3F6FF": ''}`}}>

      {props.task.completed ? 
        <CheckmarkIcon
             className="checkmark-icon" 
             onClick={handleUnmarked}/>
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text" onClick={handleSelectedTask}>
        <div style={{textDecoration: `${props.task.completed ? 'line-through' : 'none'}`}}>
             {props.task['description']}
        </div>
      </div>
        {props.task.important ? 
          <StarSolidIcon onClick={handleImportant} className="star-icon" />
        :
          <StarIcon onClick={handleImportant} className="star-icon"/>
        }
      <div className="border"></div>
    </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    reload: state.dashboard.reload,
    selectedTask: state.dashboard.selectedTask,
    editWindow: state.dashboard.editWindow
  }),
  { updateTask: dashboard.updateTask, 
    deleteTask: dashboard.deleteTask, 
    setSelectedTask: dashboard.setSelectedTask, 
    setEditWindow: dashboard.setEditWindow, 
    setEditTask: dashboard.setEditTask }
)(Task);