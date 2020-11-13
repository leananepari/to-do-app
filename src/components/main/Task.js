import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';
import checkmark_icon from '../../assets/checkmark-icon.svg';
import star_icon from '../../assets/star-icon.svg';
import star_solid_icon from '../../assets/star-solid-icon.svg';

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
        <img src={checkmark_icon} alt="checkmark icon"
             style={{width: '18px', cursor: 'pointer'}} 
             onClick={handleUnmarked}/>
        : 
        <div className="circle" onClick={handleMarked}></div>}

      <div className="text" onClick={handleSelectedTask}>
        <div style={{textDecoration: `${props.task.completed ? 'line-through' : 'none'}`}}>
             {props.task['description']}
        </div>
      </div>
        {props.task.important ? 
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