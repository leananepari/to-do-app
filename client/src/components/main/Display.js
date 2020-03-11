import React, { useState, useEffect }  from 'react';
import Todo from './Todo';
import Image from '../../assets/mountains.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const Display = ( { list, selected, updateTodo, deleteTodo, addTodo }) => {
  const [selectedList, setSelectedList] = useState([]);
  const [slideWindow, setSlideWindow] = useState(false);

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

  return (
    <div className="display">
      <div className="banner"> 
        <img src={Image} style={{width: '100%', height: '100%'}}/>
      </div>
      {selectedList.map((todo) => {
        return <Todo todo={todo} key={todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
      })}
      <div className="add-to-do" onClick={handleAddTodo}>
        <FontAwesomeIcon style={{width: '30px', height: '30px', cursor: 'pointer', color: '#495DFB'}} icon={faPlusCircle} size='lg'/> 
        <div className="text">Add a to-do</div>
      </div>
      <div className={slideWindow ? "slide-out-window-open" : "slide-out-window-close"}>
        <FontAwesomeIcon onClick={handleCloseSlideWindow} style={{width: '25px', height: '25px', cursor: 'pointer', color: 'gray', margin: '0 auto', marginRight: '0px'}} icon={faTimesCircle} size='lg'/> 
      </div>
    </div>
  )
}


export default Display;