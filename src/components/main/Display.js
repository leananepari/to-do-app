import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import plus_sign_icon from '../../assets/plus-sign-icon.svg';
import { connect } from 'react-redux';
import { addTask, setEditWindow, setSelectedTodo, setEditTodo, updateTask, deleteTask, 
         updateList, deleteList } from '../../redux/actions';
import star_icon from '../../assets/star-icon.svg';
import star_solid_icon from '../../assets/star-solid-icon.svg';
import checkmark_icon from '../../assets/checkmark-icon.svg';
import right_chevron from '../../assets/right-chevron.svg';
import trash_icon from '../../assets/trash-icon.svg';
import three_dots_icon from '../../assets/three-dots-icon.svg';
import trash_icon_red from '../../assets/trash-icon-red.svg';
import rename_icon from '../../assets/rename-icon.svg';

const Display = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedList, setSelectedList] = useState([]);
  const [newTodo, setNewTodo] = useState({ 'to_do': "", "category_id_fk": "" });
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [listName, setListName] = useState({"name": ""});
  const [listNameEdit, setListNameEdit] = useState(false);
  const [category, setCategory] = useState();
  const categoryOptions = ["To-do", "Groceries", "Work", "Family", "Travel", "Exercise"];
  let today = new Date();
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let date = weekdays[today.getDay()]+", "+months[today.getMonth()]+" "+today.getDate();
  const moreDropdownContainer = React.createRef();


  useEffect(() => {

    if (props.selected === "My Day") {
      // setSelectedList(props.taskList);
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
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  })

  const handleClick = e => {
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
    setNewTodo( { ...newTodo, [event.target.name]: event.target.value } )
  }

  const handleAddTodo = (e) => {
    e.preventDefault();

    let todo = {
      "description": newTodo['to_do'],
      "category_id_fk": newTodo["category_id_fk"],
      "completed": false,
      "important": false,
      "created": "",
      "due": "",
      "list_id_fk": "",
      "my_day": false,
      "note": ""
    }
    if (props.selected === "Important") {
      todo['important'] = true;
    }

    if (props.customListLookupByName[props.selected]) {
      todo['list_id_fk'] = props.customListLookupByName[props.selected]['list_id'];
    }

    if (props.selected === "My Day") {
      todo["my_day"] = true;
    }

    todo["user_id_fk"] = user.userid;
    props.addTask(todo, props.history)
    setNewTodo( { 'to_do': "", "category_id_fk": "" } );
    setCategory();
  }

  const handleEditTodoChange = (event) => {
    props.setEditTodo( { ...props.selectedTodo, [event.target.name]: event.target.value } )
  }

  const handleEditTodoSubmitButton = (e) => {
    e.preventDefault();
    props.updateTask(props.selectedTodo);
  }

  const handleMarked = () => {
    props.selectedTodo['completed'] = !props.selectedTodo['completed'];
    props.updateTask(props.selectedTodo, props.history)
  }

  const handleUnmarked = () => {
    props.selectedTodo['completed'] = !props.selectedTodo['completed'];
    props.updateTask(props.selectedTodo, props.history)
  }

  const handleImportant = () => {
    props.selectedTodo['important'] = !props.selectedTodo['important'];
    props.updateTask(props.selectedTodo, props.history);
  }

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleEditTodoSubmitButton(e); 
    }
  }

  const handleDelete = () => {
    props.deleteTask(props.selectedTodo.task_id, props.history)
    props.setEditWindow(false);
  }

  const handleMoreDropdown = () => {
    setMoreDropdown(!moreDropdown);
  }

  const handleRenameList = () => {
    setListName({"name": props.selected})
    setListNameEdit(true);
    setMoreDropdown(false);
  }

  const handleDeleteList = () => {
    props.deleteList(props.customListLookupByName[props.selected]['list_id']);
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
    props.updateList(list);
    setListNameEdit(false);
    props.setSelected(list['name']);
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
                  
                  <img alt="more icon" 
                       onClick={handleMoreDropdown} 
                       src={three_dots_icon} 
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
                    <div className="option-wrap" onClick={handleRenameList}>
                      <img src={rename_icon} className="img" alt="rename icon"/>
                      <ul>Rename list</ul>
                    </div>
                    <div className="option-wrap" onClick={handleDeleteList}>
                      <img src={trash_icon_red} className="img" alt="trash icon"/>
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
          
          <div className="add-to-do">

            <form onSubmit={handleAddTodo}>

              <img src={plus_sign_icon} alt="plus sign icon"/>
              <input 
                 type="text"
                 name="to_do"
                 value={newTodo.to_do} 
                 onChange={handleChange} 
                 placeholder={props.selected === "Planned" ? "Add a task due today" : "Add a task"}
                 autoComplete="off"
               />

            </form>

            <div className="border"></div>
          </div>
      
          <div className="todo-list">
            {selectedList.map((todo) => {
              return <Todo todo={todo} key={todo.task_id} />
            })}
          </div>

        </div>

      <div className={props.editWindow ? "edit-window-open" : "edit-window-close"}>

        <div className="edit-todo-window">
            <div className="edit-todo-section">

              <form className="edit-todo-form" onSubmit={handleEditTodoSubmitButton}>

                <div className="input-icon-wrap">

                  {props.selectedTodo.completed 
                  
                  ? 
                    <img alt="checkmark icon" 
                         src={checkmark_icon} 
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
                    value={props.selectedTodo.description}
                    onChange={handleEditTodoChange}
                    onKeyPress={handleUserKeyPress}
                  />

                  {props.selectedTodo.important 
                  
                  ? 
                    <img alt="star solid icon" 
                         src={star_solid_icon} 
                         onClick={handleImportant} 
                         className="star-solid-icon"
                    />
                  :
                    <img alt="star icon" 
                         src={star_icon} 
                         onClick={handleImportant} 
                         className="star-icon"
                    />
                  }
                </div>
              </form>

            </div>

            <div className="bottom-section-wrap">

              <img alt="right chevron icon" 
                   src={right_chevron} 
                   onClick={handleCloseEditWindow} 
                   className="right-chevron-icon"
              />
              <img alt="trash icon" 
                   src={trash_icon} 
                   onClick={handleDelete} 
                   className="trash-icon"
              />

            </div>

        </div>

      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    taskList: state.taskList,
    reload: state.reload,
    category_lookup: state.category_lookup,
    category_id_lookup: state.category_id_lookup,
    selectedTodo: state.selectedTodo,
    editWindow: state.editWindow,
    editTodo: state.editTodo,
    editTodoCategory: state.editTodoCategory,
    customListLookupByName: state.customListLookupByName

  }
};

export default connect (
  mapStateToProps,
  { addTask, setEditWindow, setSelectedTodo, setEditTodo, updateTask, deleteTask, updateList,
    deleteList }
)(Display)