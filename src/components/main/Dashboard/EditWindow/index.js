import React from 'react';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';
import { useHistory } from 'react-router-dom';

import { ReactComponent as StarIcon } from '../../../../assets/star-icon.svg';
import { ReactComponent as StarSolidIcon } from '../../../../assets/star-solid-icon.svg';
import { ReactComponent as CheckmarkIcon } from '../../../../assets/checkmark-icon.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/trash-icon.svg';
import { ReactComponent as SunIcon } from '../../../../assets/sun-icon.svg';
import { ReactComponent as SunIconPurple } from '../../../../assets/sun-icon-purple.svg';
import { ReactComponent as CancelIcon } from '../../../../assets/cancel-icon.svg';
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

  const handleAddToMyDay = () => {
    props.selectedTask.my_day = true;
    props.updateTaskAddToMyDay(props.selectedTask);
  }

  const handleRemoveFromToMyDay = () => {
    props.selectedTask.my_day = false;
    props.updateTaskRemoveFromMyDay(props.selectedTask);
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

        <div>
          {props.selectedTask.my_day ?
            <div className="add-to-my-day added">
              <SunIconPurple className="sun-icon" />
              <div className="added-text">Added to My Day</div>
              <CancelIcon className="cancel-icon" onClick={handleRemoveFromToMyDay}/>
            </div>
            :
            <div className="add-to-my-day add">
              <SunIcon className="sun-icon"/>
              <div onClick={handleAddToMyDay} className="add-text">Add to My Day</div>
            </div>
          }
        </div>

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
    updateTaskAddToMyDay: dashboard.updateTaskAddToMyDay,
    updateTaskRemoveFromMyDay: dashboard.updateTaskRemoveFromMyDay,
    setModalTrue: dashboard.setModalTrue
  }
)(EditTaskSideWindow);