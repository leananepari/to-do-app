
export const mapTaskList = (list, updatedTask) => {

  return list.map(task => {
    if (task.task_id === updatedTask.task_id) {
      return updatedTask
    }
    return task
  })

}

export const mapCustomList = (list, updatedList) => {

  return list.map(list => {
    if (list.list_id === updatedList.list_id) {
      return updatedList
    } else {
      return list
    }
  })

}

export const getCount = (list, tab) => {

  let options = {
    "My Day": (l) => l.filter(task => task.my_day === true && task.completed !== true),
    "Important": (l) => l.filter(task => task.important === true && task.completed !== true),
    "Planned": (l) =>  l.filter(task => task.due !== null && task.completed !== true),
    "Tasks": (l) =>  l.filter(task => task.list_id_fk === null && task.completed !== true)
  }

  return options[tab](list).length;
}

export const getCountCustomLists = (list, tab, customListLookupByName) => {
  let filtered = list.filter(task => task.list_id_fk === customListLookupByName[tab]['list_id'] && task.completed !== true);

  return filtered.length;
}

export const filterTaskList = {
  "My Day": (list) => list.filter(task => task.my_day === true),
  "Important": (list) => list.filter(task => task.important === true),
  "Planned": (list) =>  list.filter(task => task.due !== null),
  "Tasks": (list) =>  list.filter(task => task.list_id_fk === null)
}

export const formatDate = (time) => {
  let output;
  let options;
  let currYear = new Date().getFullYear();
  
  let date = new Date(time);

  date.getFullYear() < currYear || date.getFullYear() > currYear 
  ?
  options =  { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
  :
  options =  { weekday: 'short', month: 'long', day: 'numeric' };

  output = date.toLocaleDateString("en-US", options);

  return output
}