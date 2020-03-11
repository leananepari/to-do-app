import React, { useState, useEffect }  from 'react';
import Todo from './Todo';

const Display = ( { list, selected, updateTodo, deleteTodo }) => {
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    if (selected === "My Day") {
      setSelectedList(list);
    } else {
      let filtered = list.filter(todo => todo.category === selected);
      setSelectedList(filtered)
    }
  }, [list, selected])

  return (
    <div className="display">
      <div className="banner"> 

      </div>
      {selectedList.map((todo) => {
        return <Todo todo={todo} key={todo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
      })}

    </div>
  )
}


export default Display;