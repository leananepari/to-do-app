import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';
import { useHistory } from 'react-router-dom';

import AddRemoveDueDate from './AddRemoveDueDate';
import AddRemoveMyDay from './AddRemoveMyDay';

import { ReactComponent as StarIcon } from '../../../../assets/star-icon.svg';
import { ReactComponent as StarSolidIcon } from '../../../../assets/star-solid-icon.svg';
import { ReactComponent as CheckmarkIcon } from '../../../../assets/checkmark-icon.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/trash-icon.svg';
import { ReactComponent as RightChevronIcon } from '../../../../assets/right-chevron.svg';


const EditTaskSideWindow = ( props ) => {
  const history = useHistory();

  const handleEditTaskChange = (event) => {
    props.setEditTask( { ...props.selectedTask, [event.target.name]: event.target.value } );
  }

  const handleEditTaskSubmitButton = (e) => {
    e.preventDefault();
    props.updateTaskNameChange(props.selectedTask, history);
  }

  const handleMarked = () => {
    props.audio.play();
    props.selectedTask["completed"] = !props.selectedTask["completed"];
    props.updateTaskMarked(props.selectedTask, history, props.selectedTab);
  }

  const handleUnmarked = () => {
    props.selectedTask["completed"] = !props.selectedTask["completed"];
    props.updateTaskUnmarked(props.selectedTask, history, props.selectedTab);
  }

  const handleImportant = () => {
    props.selectedTask["important"] = !props.selectedTask["important"];
    props.updateTaskImportant(props.selectedTask, history);
  }

  const handleUnimportant = () => {
    props.selectedTask["important"] = !props.selectedTask["important"];
    props.updateTaskUnimportant(props.selectedTask, history);
  }

  const handleDeleteTask = () => {
    props.setModalTrue(props.selectedTask.task_id, props.selectedTask.description, 
                           props.deleteTask, history);
  }

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleEditTaskSubmitButton(e); 
    }
  }

  const handleCloseEditWindow = () => {
    props.setEditWindow(false);
  }

  return (
    <div className="edit-todo-window">
      <div className="edit-todo-section">

        <form className="edit-todo-form" onSubmit={handleEditTaskSubmitButton}>

          <div className="input-icon-wrap">

            {props.selectedTask.completed 
            
            ? 
              <CheckmarkIcon 
                  className="checkmark-icon"
                  onClick={handleUnmarked}/>
            : 
              <div className="circle" 
                  onClick={handleMarked}> 
              </div>
            }

            <textarea 
              type="text"
              name="description"
              value={props.selectedTask.description}
              onChange={handleEditTaskChange}
              onKeyPress={handleUserKeyPress}
            />

            {props.selectedTask.important 
            
            ? 
              <StarSolidIcon 
                  onClick={handleUnimportant} 
                  className="star-solid-icon"
              />
            :
              <StarIcon 
                  onClick={handleImportant} 
                  className="star-icon"
              />
            }
          </div>
        </form>

        <AddRemoveMyDay />

        <AddRemoveDueDate />

      </div>

      <div className="bottom-section-wrap">

        <RightChevronIcon 
            onClick={handleCloseEditWindow} 
            className="right-chevron-icon"
        />
        <TrashIcon
            onClick={handleDeleteTask} 
            className="trash-icon"
        />

      </div>

    </div>

  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTask: state.dashboard.selectedTask,
    selectedTab: state.dashboard.selectedTab,
    audio: state.dashboard.audio
  }),
  { setEditWindow: dashboard.setEditWindow, 
    setEditTask: dashboard.setEditTask,  
    updateTaskNameChange: dashboard.updateTaskNameChange, 
    updateTaskMarked: dashboard.updateTaskMarked,
    updateTaskUnmarked: dashboard.updateTaskUnmarked,
    updateTaskImportant: dashboard.updateTaskImportant,
    updateTaskUnimportant: dashboard.updateTaskUnimportant,
    deleteTask: dashboard.deleteTask, 
    setModalTrue: dashboard.setModalTrue
  }
)(EditTaskSideWindow);