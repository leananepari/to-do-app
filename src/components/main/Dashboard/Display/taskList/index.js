import React, { useState } from 'react';
import { connect } from 'react-redux';
import Task from './Task';

import { ReactComponent as RightChevronIcon } from '../../../../../assets/right-chevron.svg';
import { ReactComponent as DownChevronIcon } from '../../../../../assets/down-chevron.svg';


const TaskList = ( props ) => {
  const [showCompletedList, setShowCompletedList] = useState(false);


  const handleCompletedShowHide = () => {
    setShowCompletedList(!showCompletedList);
  }

  return (
    <div className="todo-list">
      {props.selectedTaskList.filter(task => task.completed !== true).map((task) => {
        return <Task task={task} key={task.task_id} />
      })}
      <div className="completed-list">
        <div className="completed-title-wrap" 
            style={{display: `${props.selectedTaskList.filter(task => task.completed === true).length > 0 ? "block" : "none"}`}}>
          {showCompletedList ? 
            <DownChevronIcon className="completed-list-icon" onClick={handleCompletedShowHide}/>
          : 
            <RightChevronIcon className="completed-list-icon"onClick={handleCompletedShowHide}/>
          }
          Completed
          <div className="border" style={{display: `${showCompletedList ? "none" : "block"}`}}></div>
        </div>
        <div style={{display: `${showCompletedList ? "block" : "none"}`}}>
          {props.selectedTaskList.filter(task => task.completed === true).map((task) => {
            return <Task task={task} key={task.task_id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    dashboard: state.dashboard,
    selectedTaskList: state.dashboard.selectedTaskList
  }),
  {}
)(TaskList);