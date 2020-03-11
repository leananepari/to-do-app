import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import Image from '../../assets/mountains.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'


const Display = ( { list, selected, updateTodo, deleteTodo, addTodo }) => {
  const [selectedList, setSelectedList] = useState([]);
  const [slideWindow, setSlideWindow] = useState(false);
  const [newTodo, setNewTodo] = useState({'to_do': "", "category": ""});
  const [category, setCategory] = useState();
  const categoryOptions = ["To Do", "Groceries", "Work", "Family", "Travel", "Excercise"];

  useEffect(() => {
    if (selected === "My Day") {
      setSelectedList(list);
    } else {
      let filtered = list.filter(todo => todo.category === selected);
      setSelectedList(filtered)
    }
  }, [list, selected, slideWindow])

  const handleAddTodo = () => {
    setSlideWindow(true);
  }

  const handleCloseSlideWindow = () => {
    setSlideWindow(false);
  }

  const handleChange = (event) => {
    setNewTodo({...newTodo, [event.target.name]: event.target.value })
  }

  const handleCategoryDropdown = (event) => {
    let index;
    for (let i = 0; i < categoryOptions.length; i++) {
      if (categoryOptions[i] === event.value) {
        index = i;
      }
    }
    setCategory(categoryOptions[index]); 
    setNewTodo({...newTodo, category: event.value})
  }

  const handleAddButton = () => {
    console.log('here', newTodo)
    addTodo(newTodo);
    setNewTodo({'to_do': "", "category": ""});
    setCategory();
  }

  return (
    <div className="display">
      <div className="banner"> 
        <img src={Image} style={{width: '100%', height: '100%'}}/>
      </div>
      <div className="todo-list">
        {selectedList.map((todo) => {
          return <Todo todo={todo} key={todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
        })}
      </div>
      <div className="add-to-do" onClick={handleAddTodo}>
        <FontAwesomeIcon style={{width: '30px', height: '30px', cursor: 'pointer', color: '#495DFB'}} icon={faPlusCircle} size='lg'/> 
        <div className="text">Add a to-do</div>
      </div>
      <div className={slideWindow ? "slide-out-window-open" : "slide-out-window-close"}>
        <div className="add-to-do-window">
          <div className="top-section">
            <h2>Add a to-do</h2>
            <textarea 
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
            <button onClick={handleAddButton} className="add-button">Add</button>
          </div>
          <div>
            <FontAwesomeIcon onClick={handleCloseSlideWindow} style={{width: '25px', height: '25px', cursor: 'pointer', color: 'gray', margin: '20px'}} icon={faChevronRight} size='lg'/> 
          </div>
        </div>
      </div>
    </div>
  )
}


export default Display;