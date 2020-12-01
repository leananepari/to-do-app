import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { dashboard } from '../../../../../state/actions';

import { ReactComponent as PlusSignIcon } from '../../../../../assets/plus-sign-icon.svg';


const AddNewTask = ( props ) => {
  const [newTask, setNewTodo] = useState({ 'to_do': "", "category_id_fk": "" });
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleChange = (event) => {
    setNewTodo( { ...newTask, [event.target.name]: event.target.value } );
  }

  const handleAddTask = (e) => {
    e.preventDefault();

    let task = {
      "description": newTask["to_do"],
      "category_id_fk": newTask["category_id_fk"],
      "completed": false,
      "important": props.selectedTab === "Important" ? true : false,
      "created": "",
      "due": props.selectedTab === "Planned" ? new Date() : "",
      "list_id_fk": props.customListLookupByName[props.selectedTab] ? 
                    props.customListLookupByName[props.selectedTab]["list_id"] : "",
      "my_day": props.selectedTab === "My Day" ? true : false,
      "note": "",
      "user_id_fk": user.userid
    }

    props.addTask(task, history, props.selectedTab);
    setNewTodo( { "to_do": "", "category_id_fk": "" } );
  }

  const handleOnFocus = () => {
    props.setInputFocus(true);
  }

  return (
    <div className="add-to-do">

      <form onSubmit={handleAddTask} >

        {props.inputFocus ? 
          <div className="circle"></div>
          :
          <PlusSignIcon style={{width: "18px", height: "18px"}}/>
        }
        <input 
          type="text"
          name="to_do"
          value={newTask.to_do} 
          onChange={handleChange} 
          placeholder={props.selectedTab === "Planned" ? "Add a task due today" : "Add a task"}
          autoComplete="off"
          onFocus={handleOnFocus}
          ref={props.reference}
        />

      </form>

      <div className="border" style={{borderBottom: `${props.inputFocus ? "1px solid #3F6AE3" : "1px solid #EAEAEA"}`}}></div>
    </div>
  )
}

export default connect(
  state => ({
    dashboard: state.dashboard,
    taskList: state.dashboard.taskList,
    category_lookup: state.dashboard.category_lookup,
    category_id_lookup: state.dashboard.category_id_lookup,
    selectedTask: state.dashboard.selectedTask,
    editWindow: state.dashboard.editWindow,
    editTask: state.dashboard.editTask,
    editTaskCategory: state.dashboard.editTaskCategory,
    customListLookupByName: state.dashboard.customListLookupByName,
    selectedTab: state.dashboard.selectedTab,
    audio: state.dashboard.audio,
    modalDeleteText: state.dashboard.modalDeleteText,
    modalDeleteFunction: state.dashboard.modalDeleteFunction,
    moreDropdown: state.dashboard.moreDropdown,
    selectedTaskList: state.dashboard.selectedTaskList
  }),
  { addTask: dashboard.addTask, 
    setEditWindow: dashboard.setEditWindow, 
    setSelectedTask: dashboard.setSelectedTask, 
    setEditTask: dashboard.setEditTask, 
    updateTaskNameChange: dashboard.updateTaskNameChange, 
    updateTaskMarked: dashboard.updateTaskMarked,
    updateTaskUnmarked: dashboard.updateTaskUnmarked,
    updateTaskImportant: dashboard.updateTaskImportant,
    updateTaskUnimportant: dashboard.updateTaskUnimportant,
    deleteTask: dashboard.deleteTask, 
    updateCustomList: dashboard.updateCustomList,
    deleteCustomList: dashboard.deleteCustomList, 
    setSelectedTab: dashboard.setSelectedTab,
    updateTaskAddToMyDay: dashboard.updateTaskAddToMyDay,
    updateTaskRemoveFromMyDay: dashboard.updateTaskRemoveFromMyDay,
    setModalTrue: dashboard.setModalTrue,
    setMoreDropdown: dashboard.setMoreDropdown,
    setSelectedTaskList: dashboard.setSelectedTaskList
  }
)(AddNewTask);