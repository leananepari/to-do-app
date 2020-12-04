import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { dashboard } from '../../../../../state/actions';

import { ReactComponent as StarIcon } from '../../../../../assets/star-icon.svg';
import { ReactComponent as StarSolidIcon } from '../../../../../assets/star-solid-icon.svg';
import { ReactComponent as CheckmarkIcon } from '../../../../../assets/checkmark-icon.svg';
import { ReactComponent as SunIcon } from '../../../../../assets/sun-icon-small.svg';
import { ReactComponent as CalendarIcon } from '../../../../../assets/calendar-icon-category.svg';
import { ReactComponent as CalendarIconRed } from '../../../../../assets/calendar-icon-category-red.svg';


import { formatDate } from '../../../../../utils/helpers';


const Task = ( props ) => {
  const history = useHistory();
  const [date, setDate] = useState();
  let now = new Date();
  now.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (props.task.due !== null) {
      setDate(formatDate(props.task.due));
    }
  })

  const handleMarked = () => {
    props.audio.play();
    props.task["completed"] = !props.task["completed"];
    if (props.selectedTask !== '' && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask["completed"] = !props.selectedTask["completed"];
    }
    props.updateTaskMarked(props.task, history, props.selectedTab);
  }

  const handleUnmarked = () => {
    props.task["completed"] = !props.task["completed"];
    if (props.selectedTask !== '' && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask["completed"] = !props.selectedTask["completed"];
    }
    props.updateTaskUnmarked(props.task, history, props.selectedTab);
  }

  const handleImportant = () => {
    props.task["important"] = !props.task["important"];
    if (props.selectedTask !== "" && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask["important"] = !props.selectedTask["important"];
    }
    props.updateTaskImportant(props.task, history);
  }

  const handleUnimportant = () => {
    props.task["important"] = !props.task["important"];
    if (props.selectedTask !== "" && props.selectedTask.task_id === props.task.task_id) {
      props.selectedTask["important"] = !props.selectedTask["important"];
    }
    props.updateTaskUnimportant(props.task, history);
  }

  const handleSelectedTask = () => {
    props.setSelectedTask(props.task);
    props.setEditTask(props.task);
    if (props.editWindow === false) {
      props.setEditWindow(true);
    }
  }

  return (
    <div className="task" onClick={handleSelectedTask}
         style={{ backgroundColor: `${props.selectedTask !== "" 
                                   && props.selectedTask.task_id === props.task.task_id 
                                   && props.editWindow ? "#F3F6FF": ""}`}}>

      {props.task.completed 
        ? 
          <CheckmarkIcon className="checkmark-icon" 
                       onClick={handleUnmarked}/>
        : 
          <div className="circle" onClick={handleMarked}></div>
      }

      <div className="task-description">

        <div style={{textDecoration: `${props.task.completed ? "line-through" : "none"}`}}>
             {props.task["description"]}
        </div>

        <div className="categories-wrap">

          <div className="category" style={{display: `${props.selectedTab === "My Day" 
                                                        || props.selectedTab === "Important" 
                                                        || props.selectedTab === "Planned" ? 'block' : 'none'}`}}>
              {props.task.list_id_fk !== null ? props.customListLookupById[props.task.list_id_fk]
               : "Tasks"}
          </div>

          {props.selectedTab !== "My Day" 
           && props.selectedTab !== "Important" 
           && props.selectedTab !== "Planned" 
           && props.task.my_day
           ?
           <div className="category-icon-wrap">
             <SunIcon className="icon"/>
             <div className="category">My Day</div>
           </div>
           :
           (props.selectedTab === "My Day" 
           || props.selectedTab === "Important" 
           || props.selectedTab === "Planned")
           && props.task.my_day ?
           <>
           <div className="dot"></div>
           <div className="category-icon-wrap">
             <SunIcon className="icon"/>
             <div className="category">My Day</div>
           </div>
           </>
            : null
          }
          
          {props.task.due 
          ?
            props.task.due > now 
              ?
                <div className="category-icon-wrap">
                  <CalendarIcon className="icon"/>
                  <div className="category">Due {date}</div>
                </div>
              :
                <div className="category-icon-wrap">
                  <CalendarIconRed className="icon"/>
                  <div className="category overdue">Overdue {date}</div>
                </div>
          :
            null
          }

        </div>

      </div>

      {props.task.important ? 
        <StarSolidIcon onClick={handleUnimportant} className="star-icon" />
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
    selectedTask: state.dashboard.selectedTask,
    editWindow: state.dashboard.editWindow,
    selectedTab: state.dashboard.selectedTab,
    audio: state.dashboard.audio,
    customListLookupById: state.dashboard.customListLookupById
  }),
  { updateTaskMarked: dashboard.updateTaskMarked,
    updateTaskUnmarked: dashboard.updateTaskUnmarked,
    updateTaskImportant: dashboard.updateTaskImportant,
    updateTaskUnimportant: dashboard.updateTaskUnimportant,
    deleteTask: dashboard.deleteTask, 
    setSelectedTask: dashboard.setSelectedTask, 
    setEditWindow: dashboard.setEditWindow, 
    setEditTask: dashboard.setEditTask,
  }
)(Task);
