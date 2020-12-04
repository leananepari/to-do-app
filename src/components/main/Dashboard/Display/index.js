import React, { useEffect }  from 'react';
import Modal from '../Modal/Modal';
import EditTaskSideWindow from '../EditWindow';
import AddNewTask from './addNewTask';
import Header from './header';
import TaskList from './taskList';
import { connect } from 'react-redux';
import { dashboard } from '../../../../state/actions';
import { filterTaskList } from '../../../../utils/helpers';


const Display = ( props ) => {

  useEffect(() => {

    if (filterTaskList[props.selectedTab]) {
      props.setSelectedTaskList(filterTaskList[props.selectedTab](props.taskList));
    }
    if (props.customListLookupByName[props.selectedTab]) {
        props.setSelectedTaskList(props.taskList.filter(todo => 
        todo.list_id_fk === props.customListLookupByName[props.selectedTab]['list_id']));
    }

  }, [props.taskList, props.selectedTab, props.slideWindow])


  return (
    <div className="display">
        
        <div className="middle-section-wrap">

          <Header />

          <AddNewTask />

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
    setSelectedTaskList: dashboard.setSelectedTaskList,
  }
)(Display);