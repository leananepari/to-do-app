import React, { useState, useEffect }  from 'react';
import Task from './Task';
import { connect } from 'react-redux';
import { dashboard } from '../../state/actions';

import { ReactComponent as PlusSignIcon } from '../../assets/plus-sign-icon.svg';
import { ReactComponent as StarIcon } from '../../assets/star-icon.svg';
import { ReactComponent as StarSolidIcon } from '../../assets/star-solid-icon.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/checkmark-icon.svg';
import { ReactComponent as RightChevronIcon } from '../../assets/right-chevron.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash-icon.svg';
import { ReactComponent as ThreeDotsIcon } from '../../assets/three-dots-icon.svg';
import { ReactComponent as TrashIconRed } from '../../assets/trash-icon-red.svg';
import { ReactComponent as RenameIcon } from '../../assets/rename-icon.svg';

const Display = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedList, setSelectedList] = useState([]);
  const [newTask, setNewTodo] = useState({ 'to_do': "", "category_id_fk": "" });
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [listName, setListName] = useState({"name": ""});
  const [listNameEdit, setListNameEdit] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const moreDropdownContainer = React.createRef();
  const addTaskInputContainer = React.createRef();
  let today = new Date();
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let date = weekdays[today.getDay()]+", "+months[today.getMonth()]+" "+today.getDate();


  useEffect(() => {

    if (props.selected === "My Day") {
      let filtered = props.taskList.filter(todo => todo.my_day === true);
      setSelectedList(filtered)
    } else if (props.selected === "Important") {
        let filtered = props.taskList.filter(todo => todo.important === true);
        setSelectedList(filtered)
    } else if (props.selected === "Planned") {
        let filtered = props.taskList.filter(todo => todo.due !== null);
        setSelectedList(filtered)
    } else if (props.selected === "Tasks") {
        let filtered = props.taskList.filter(todo => todo.list_id_fk === null);
        setSelectedList(filtered)
    } else {
      if (props.customListLookupByName[props.selected]) {
        let filtered = props.taskList.filter(todo => todo.list_id_fk === props.customListLookupByName[props.selected]['list_id']);
        setSelectedList(filtered)
      }
    }

  }, [props.taskList, props.selected, props.slideWindow, props.reload])

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
    document.addEventListener("mousedown", handleOutsideClickInput);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClickInput);
    };
  })

  const handleOutsideClickInput = e => {
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
    setMoreDropdown(false);
    setListNameEdit(false);
  };

  const handleCloseEditWindow = () => {
    props.setEditWindow(false);
  }

  const handleChange = (event) => {
    setNewTodo( { ...newTask, [event.target.name]: event.target.value } )
  }

  const handleAddTask = (e) => {
    e.preventDefault();

    let task = {
      "description": newTask['to_do'],
      "category_id_fk": newTask["category_id_fk"],
      "completed": false,
      "important": false,
      "created": "",
      "due": "",
      "list_id_fk": "",
      "my_day": false,
      "note": ""
    }
    if (props.selected === "Important") {
      task['important'] = true;
    }

    if (props.customListLookupByName[props.selected]) {
      task['list_id_fk'] = props.customListLookupByName[props.selected]['list_id'];
    }

    if (props.selected === "My Day") {
      task["my_day"] = true;
    }

    task["user_id_fk"] = user.userid;
    props.addTask(task, props.history)
    setNewTodo( { 'to_do': "", "category_id_fk": "" } );

  }

  const handleEditTaskChange = (event) => {
    props.setEditTask( { ...props.selectedTask, [event.target.name]: event.target.value } )
  }

  const handleEditTaskSubmitButton = (e) => {
    e.preventDefault();
    props.updateTask(props.selectedTask);
  }

  const handleMarked = () => {
    props.selectedTask['completed'] = !props.selectedTask['completed'];
    props.updateTask(props.selectedTask, props.history)
  }

  const handleUnmarked = () => {
    props.selectedTask['completed'] = !props.selectedTask['completed'];
    props.updateTask(props.selectedTask, props.history)
  }

  const handleImportant = () => {
    props.selectedTask['important'] = !props.selectedTask['important'];
    props.updateTask(props.selectedTask, props.history);
  }

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleEditTaskSubmitButton(e); 
    }
  }

  const handleDeleteTask = () => {
    props.deleteTask(props.selectedTask.task_id, props.history)
    props.setEditWindow(false);
  }

  const handleMoreDropdown = () => {
    setMoreDropdown(!moreDropdown);
  }

  const handleRenameCustomList = () => {
    setListName({"name": props.selected})
    setListNameEdit(true);
    setMoreDropdown(false);
  }

  const handleDeleteCustomList = () => {
    props.deleteCustomList(props.customListLookupByName[props.selected]['list_id']);
    setMoreDropdown(false);
    props.setSelected("Tasks");
  }

  const handleChangeListName = ( event ) => {
    setListName( { ...listName, [event.target.name]: event.target.value } )
  }

  const handleListUpdateSubmit = e => {
    e.preventDefault();
    let list = props.customListLookupByName[props.selected];
    list['name'] = listName.name;
    props.updateCustomList(list);
    setListNameEdit(false);
    props.setSelected(list['name']);
  }

  const handleOnFocus = () => {
    setInputFocus(true);
  }


  return (
    <div className="display">
        
        <div className="middle-section-wrap">

          <div className="text-wrap" ref={moreDropdownContainer}>

            <div className="title-wrap">
               {listNameEdit 

                ? 
                  <form onSubmit={handleListUpdateSubmit}>
                    <input 
                      autoFocus
                      type="text"
                      name="name"
                      value={listName.name} 
                      onChange={handleChangeListName} 
                      autoComplete="off"
                    />
                  </form>
                :
                  <div className="title" 
                       style={{color: `${props.selected !== "My Day" ? "#3F6AE3" : "#34383C"}`}}>
                       {props.selected}
                  </div>
               }

               {props.selected !== "My Day" 
                && props.selected !== "Important" 
                && props.selected !== "Planned" 
                && props.selected !== "Tasks" 

                ?
                  
                  <ThreeDotsIcon 
                       onClick={handleMoreDropdown} 
                       className="more-icon"
                  />
                :
                  <></>
                }
            </div>


            <div className="more-dropdown" 
                 style={{display: `${moreDropdown ? 'block' : 'none'}`}}>

              <div className="options">
                {props.selected === "Important" 
                 || props.selected === "Planned" ? "Options" : "List options"}
              </div>

              {props.selected !== "My Day" 
               && props.selected !== "Important" 
               && props.selected !== "Planned" 
               && props.selected !== "Tasks" 
               
               ? 
                  <div>
                    <div className="option-wrap" onClick={handleRenameCustomList}>
                      <RenameIcon className="icon" />
                      <ul>Rename list</ul>
                    </div>
                    <div className="option-wrap" onClick={handleDeleteCustomList}>
                      <TrashIconRed className="icon" />
                      <ul style={{color: '#DB3B29'}}>Delete list</ul>
                    </div>
                  </div>
                :
                  <></>
              }
            </div>


            {props.selected === "My Day" 
            
            ?
              <div className="date">{date}</div>
            :
              <></>
            }
          </div>
          
          <div className="add-to-do" ref={addTaskInputContainer}>

            <form onSubmit={handleAddTask}>

              {inputFocus ? 
                <div className="circle"></div>
                :
                <PlusSignIcon style={{width: '18px', height: '18px'}}/>

              }
              <input 
                 type="text"
                 name="to_do"
                 value={newTask.to_do} 
                 onChange={handleChange} 
                 placeholder={props.selected === "Planned" ? "Add a task due today" : "Add a task"}
                 autoComplete="off"
                 onFocus={handleOnFocus}
               />

            </form>

            <div className="border" style={{borderBottom: `${inputFocus ? '1px solid #3F6AE3' : '1px solid #EAEAEA'}`}}></div>
          </div>
      
          <div className="todo-list">
            {selectedList.map((task) => {
              return <Task task={task} key={task.task_id} />
            })}
          </div>

        </div>

      <div className={props.editWindow ? "edit-window-open" : "edit-window-close"}>

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
                         onClick={handleImportant} 
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

      </div>
    </div>
  )
}


export default connect(
  state => ({
    dashboard: state.dashboard,
    taskList: state.dashboard.taskList,
    reload: state.dashboard.reload,
    category_lookup: state.dashboard.category_lookup,
    category_id_lookup: state.dashboard.category_id_lookup,
    selectedTask: state.dashboard.selectedTask,
    editWindow: state.dashboard.editWindow,
    editTask: state.dashboard.editTask,
    editTaskCategory: state.dashboard.editTaskCategory,
    customListLookupByName: state.dashboard.customListLookupByName
  }),
  { addTask: dashboard.addTask, 
    setEditWindow: dashboard.setEditWindow, 
    setSelectedTask: dashboard.setSelectedTask, 
    setEditTask: dashboard.setEditTask, 
    updateTask: dashboard.updateTask, 
    deleteTask: dashboard.deleteTask, 
    updateCustomList: dashboard.updateCustomList,
    deleteCustomList: dashboard.deleteCustomList }
)(Display);