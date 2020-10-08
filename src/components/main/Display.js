import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import Image from '../../assets/mountains.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faChevronRight, faCheckCircle, faStar as starSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as starOutline} from '@fortawesome/free-regular-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { connect } from 'react-redux';
import { addTask, setSlideWindow, setSelectedTodo, setEditTodo, updateTask } from '../../redux/actions';


const Display = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedList, setSelectedList] = useState([]);
  const [newTodo, setNewTodo] = useState({ 'to_do': "", "category_id_fk": "" });
  const [category, setCategory] = useState();
  const categoryOptions = ["To-do", "Groceries", "Work", "Family", "Travel", "Exercise"];
  let today = new Date();
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let date = weekdays[today.getDay()]+", "+today.getDate()+" "+months[today.getMonth()];

  useEffect(() => {

    if (props.selected === "My Day") {
      setSelectedList(props.taskList);
    } else {
      if (props.selected === "Important") {
        let filtered = props.taskList.filter(todo => todo.important === true);
        setSelectedList(filtered)
      } else {
        let filtered = props.taskList.filter(todo => props.category_lookup[todo.category_id_fk.toString()] === props.selected);
        setSelectedList(filtered)
      }
    }

  }, [props.taskList, props.selected, props.slideWindow, props.reload])

  const handleOpenSlideWindow = () => {
    if (props.slideWindow && props.selectedTodo !== '') {
      props.setSelectedTodo('');
    } else {
      props.setSlideWindow(true);
    }
  }

  const handleCloseSlideWindow = () => {
    props.setSlideWindow(false);
  }

  const handleChange = (event) => {
    setNewTodo( { ...newTodo, [event.target.name]: event.target.value } )
  }

  const handleCategoryDropdown = (event) => {
    let id;
    for (let i = 0; i < categoryOptions.length; i++) {
      if (categoryOptions[i] === event.value) {
        id = props.category_id_lookup[categoryOptions[i]];
      }
    }
    setCategory(event.value); 
    setNewTodo( { ...newTodo, category_id_fk: id } )
  }

  const handleAddButton = (e) => {
    e.preventDefault();

    let todo = {
      "description": newTodo['to_do'],
      "category_id_fk": newTodo["category_id_fk"],
      "completed": false,
      "important": false,
      "created": "",
      "due": ""
    }
    //if category wasn't selected set it to default 'to-do'
    if (newTodo['category_id_fk'] === "") {
      todo["category_id_fk"] = props.category_id_lookup["To-do"];
    }

    todo["user_id_fk"] = user.userid;
    props.addTask(todo, props.history)
    setNewTodo( { 'to_do': "", "category_id_fk": "" } );
    setCategory();
  }

  const handleEditTodoCategoryDropdown = (event) => {
    let id;
    for (let i = 0; i < categoryOptions.length; i++) {
      if (categoryOptions[i] === event.value) {
        id = props.category_id_lookup[categoryOptions[i]];
      }
    }
    props.setEditTodo( { ...props.editTodo, category_id_fk: id } );
  }

  const handleEditTodoChange = (event) => {
    props.setEditTodo( { ...props.editTodo, [event.target.name]: event.target.value } )
  }

  const handleEditTodoSubmitButton = (e) => {
    e.preventDefault();
    props.updateTask(props.editTodo);
    props.setSelectedTodo('');
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

  return (
    <div className="display">
      <div className="banner"> 
        <img src={Image} alt="background-image"style={{width: '100%', height: '100%'}}/>
        <div className="text">
          <div className="title">{props.selected}</div>
          <div className="date">{date}</div>
        </div>
      </div>
      <div className="todo-list">
        {selectedList.map((todo) => {
          return <Todo todo={todo} key={todo.task_id} />
        })}
      </div>
      <div className="add-to-do" >
        <div onClick={handleOpenSlideWindow} className="click-wrap">
          <FontAwesomeIcon style={{width: '30px', 
                                  height: '30px', 
                                  cursor: 'pointer', 
                                  color: '#495DFB'}} icon={faPlusCircle} size='lg'/> 
          <div className="text">Add a to-do</div>
        </div>
      </div>
      <div className={props.slideWindow ? "slide-out-window-open" : "slide-out-window-close"}>
        <div className="slide-window">
          {props.selectedTodo === '' ? 
            <div className="add-todo-top-section">
              <h2>Add a to-do</h2>
              <form className="add-todo-form">
                <input 
                  type="text"
                  name="to_do"
                  value={newTodo.to_do}
                  onChange={handleChange}
                  placeholder="New to-do"
                />
                <Dropdown 
                  onChange={handleCategoryDropdown} 
                  controlClassName='myControlClassName' 
                  className='dropdownRoot' 
                  options={categoryOptions}   
                  value={category} 
                  placeholder='Select category...'
                />
                <button type="submit" onClick={handleAddButton} className="add-button">Add</button>
              </form>
            </div>

          :
            <div className="edit-todo-section">
              <form className="edit-todo-form">
                <div className="input-icon-wrap">
                  {props.selectedTodo.completed ? 
                    <FontAwesomeIcon 
                    onClick={handleUnmarked} 
                    style={{width: '18px', 
                            height: '18px', 
                            cursor: 'pointer', 
                            color: '#69B100',
                            marginTop: '7px'
                          }} 
                                    icon={faCheckCircle} size='lg'/> 
                    : 
                    <div className="circle" 
                    onClick={handleMarked}
                    ></div>
                  }
                  <textarea 
                    type="text"
                    wrap="soft"
                    name="description"
                    value={props.editTodo.description}
                    onChange={handleEditTodoChange}
                  />
                  <FontAwesomeIcon 
                         onClick={handleImportant} 
                         className={props.selectedTodo.important ? "star" : "none"} 
                         style={{width: '18px', 
                                 height: '18px', 
                                 cursor: 'pointer', 
                                 color: `${props.selectedTodo.important ? '#FFFF33' : 'gray'}`, 
                                 margin: '0 auto', 
                                 marginRight: '0px',
                                 marginTop: '5px'
                                }} 
                         icon={props.selectedTodo.important ? starSolid : starOutline} 
                         size='lg'/> 
                </div>
                <Dropdown 
                  onChange={handleEditTodoCategoryDropdown} 
                  controlClassName='myControlClassName' 
                  className='dropdownRoot' 
                  options={categoryOptions}   
                  value={props.editTodoCategory} 
                  placeholder='Select category...'
                />
                <button type="submit" onClick={handleEditTodoSubmitButton} className="save-button">Save</button>
              </form>
            </div>
          }

          <div>
            <FontAwesomeIcon onClick={handleCloseSlideWindow} style={{width: '25px', 
                                                                      height: '25px', 
                                                                      cursor: 'pointer', 
                                                                      color: 'gray', 
                                                                      margin: '20px'}} 
                                                              icon={faChevronRight} size='lg'/> 
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
    slideWindow: state.slideWindow,
    editTodo: state.editTodo,
    editTodoCategory: state.editTodoCategory
  }
};

export default connect (
  mapStateToProps,
  { addTask, setSlideWindow, setSelectedTodo, setEditTodo, updateTask }
)(Display)