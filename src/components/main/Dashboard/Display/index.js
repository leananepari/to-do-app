import React, { useState, useEffect, useRef }  from 'react';
import Modal from '../Modal/Modal';
import EditTaskSideWindow from '../EditWindow';
import AddNewTask from './addNewTask';
import Header from './header';
import TaskList from './taskList';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';
import { filterTaskList } from '../../../../utils/helpers';


const Display = ( props ) => {
  const [inputFocus, setInputFocus] = useState(false);
  const moreDropdownContainer = useRef();
  const addTaskInputContainer = useRef();


  useEffect(() => {

    if (filterTaskList[props.selectedTab]) {
      props.setSelectedTaskList(filterTaskList[props.selectedTab](props.taskList));
    }
    if (props.customListLookupByName[props.selectedTab]) {
        props.setSelectedTaskList(props.taskList.filter(todo => 
        todo.list_id_fk === props.customListLookupByName[props.selectedTab]['list_id']));
    }

  }, [props.taskList, props.selectedTab, props.slideWindow])

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleOutsideClickDropdown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClickDropdown);
    };
  })

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleOutsideClickAddTaskInput);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClickAddTaskInput);
    };
  })


  const handleOutsideClickAddTaskInput = e => {
    if (addTaskInputContainer.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setInputFocus(false);
  };

  const handleOutsideClickDropdown = e => {
    if (moreDropdownContainer.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    props.setMoreDropdown(false);
    setInputFocus(false);
    props.setEditListName(false);
  };



  return (
    <div className="display">
        
        <div className="middle-section-wrap">

          <Header reference={moreDropdownContainer}/>

          <AddNewTask reference={addTaskInputContainer} 
                      inputFocus={inputFocus} 
                      setInputFocus={setInputFocus}/>

          <TaskList />

        </div>

        <div className={props.editWindow ? "edit-window-open" : "edit-window-close"}>
          <EditTaskSideWindow />
        </div>

        <Modal />

    </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    taskList: state.dashboard.taskList,
    editWindow: state.dashboard.editWindow,
    customListLookupByName: state.dashboard.customListLookupByName,
    selectedTab: state.dashboard.selectedTab
  }),
  {
    setMoreDropdown: dashboard.setMoreDropdown,
    setSelectedTaskList: dashboard.setSelectedTaskList,
    setEditListName: dashboard.setEditListName
  }
)(Display);