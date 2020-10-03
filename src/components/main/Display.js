import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import Image from '../../assets/mountains.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { category_lookup, id_lookup } from '../../data';
import { connect } from 'react-redux';
import { addTask } from '../../redux/actions';


const Display = ( props ) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedList, setSelectedList] = useState([]);
  const [slideWindow, setSlideWindow] = useState(false);
  const [newTodo, setNewTodo] = useState({'to_do': "", "category_id_fk": ""});
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
        let filtered = props.taskList.filter(todo => category_lookup[todo.category_id_fk.toString()] === props.selected);
        setSelectedList(filtered)
      }
    }

  }, [props.taskList, props.selected, slideWindow, props.reload])

  const handleOpenSlideWindow = () => {
    setSlideWindow(true);
  }

  const handleCloseSlideWindow = () => {
    setSlideWindow(false);
  }

  const handleChange = (event) => {
    setNewTodo({...newTodo, [event.target.name]: event.target.value })
  }

  const handleCategoryDropdown = (event) => {
    let id;
    for (let i = 0; i < categoryOptions.length; i++) {
      if (categoryOptions[i] === event.value) {
        id = id_lookup[categoryOptions[i]];
      }
    }
    setCategory(event.value); 
    setNewTodo({...newTodo, category_id_fk: id})
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
    if (newTodo['category_id_fk'] == "") {
      todo["category_id_fk"] = id_lookup["To-do"];
    }

    todo["user_id_fk"] = user.userid;
    props.addTask(todo)
    setNewTodo({'to_do': "", "category_id_fk": ""});
    setCategory();
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
      <div className="add-to-do" onClick={handleOpenSlideWindow}>
        <FontAwesomeIcon style={{width: '30px', 
                                 height: '30px', 
                                 cursor: 'pointer', 
                                 color: '#495DFB'}} icon={faPlusCircle} size='lg'/> 
        <div className="text">Add a to-do</div>
      </div>
      <div className={slideWindow ? "slide-out-window-open" : "slide-out-window-close"}>
        <div className="add-to-do-window">
          <div className="top-section">
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
    reload: state.reload
  }
};

export default connect (
  mapStateToProps,
  { addTask }
)(Display)