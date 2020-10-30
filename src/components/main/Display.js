import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import plus_sign_icon from '../../assets/plus-sign-icon.svg';
import { connect } from 'react-redux';
import { addTask, setEditWindow, setSelectedTodo, setEditTodo, updateTask, deleteTask } from '../../redux/actions';
import star_icon from '../../assets/star-icon.svg';
import star_solid_icon from '../../assets/star-solid-icon.svg';
import checkmark_icon from '../../assets/checkmark-icon.svg';
import right_chevron from '../../assets/right-chevron.svg';
import trash_icon from '../../assets/trash-icon.svg';

const Display = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedList, setSelectedList] = useState([]);
  const [newTodo, setNewTodo] = useState({ 'to_do': "", "category_id_fk": "" });
  const [category, setCategory] = useState();
  const categoryOptions = ["To-do", "Groceries", "Work", "Family", "Travel", "Exercise"];
  let today = new Date();
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let date = weekdays[today.getDay()]+", "+months[today.getMonth()]+" "+today.getDate();

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

  return (
    <div className="display">
        
        <div style={{width: '100%', margin: '0 10px 0 10px'}}>
          <div className="text-wrap">
            <div className="title" style={{color: `${props.selected !== "My Day" ? "#3F6AE3" : "#34383C"}`}}>{props.selected}</div>
            {props.selected === "My Day" ?
              <div className="date">{date}</div>
            :
              <></>
            }
          </div>
          <div className="add-to-do" >
            <form onSubmit={handleAddTodo} >
              <img src={plus_sign_icon} style={{width: '16px'}} />
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
                  {props.selectedTodo.completed ? 
                    <img src={checkmark_icon} style={{width: '18px', cursor: 'pointer', marginTop: '7px', height: '18px'}} onClick={handleUnmarked}/>
                    : 
                    <div className="circle" 
                    onClick={handleMarked}
                    ></div>
                  }

                  <textarea 
                    type="text"
                    name="description"
                    value={props.selectedTodo.description}
                    onChange={handleEditTodoChange}
                    onKeyPress={handleUserKeyPress}
                  />
                  {props.selectedTodo.important ? 
                    <img src={star_solid_icon} onClick={handleImportant} 
                         style={{width: '16px', height: '16px', cursor: 'pointer', margin: '0 auto', marginRight: '0px',
                         marginTop: '5px'}}/>
                  :
                    <img src={star_icon} onClick={handleImportant} 
                         style={{width: '16px', height: '16px', cursor: 'pointer', margin: '0 auto', marginRight: '0px', 
                         marginTop: '5px'}}/>
                  }
                </div>
              </form>
            </div>
            <div className="bottom-section-wrap">
              <img src={right_chevron} onClick={handleCloseEditWindow} style={{width: '16px', cursor: 'pointer', margin: '20px'}}/>
              <img src={trash_icon} onClick={handleDelete} style={{width: '16px', cursor: 'pointer', margin: '20px'}} />
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
  { addTask, setEditWindow, setSelectedTodo, setEditTodo, updateTask, deleteTask }
)(Display)