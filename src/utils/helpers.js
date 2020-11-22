
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

export const countCategories = (list, customListLookupById) => {

  let storeCount = {
    "My Day": 0,
    "Important": 0,
    "Planned": 0,
    "Tasks": 0
  };

  if (list.length > 0) {

    list.forEach(task => {

      if (task.list_id_fk !== null) {

        (storeCount[customListLookupById[task.list_id_fk.toString()]] 
         && task.completed !== true) ?
          storeCount[customListLookupById[task.list_id_fk.toString()]] += 1
        :
          task.completed !== true ? 
            storeCount[customListLookupById[task.list_id_fk.toString()]] = 1
          :
            storeCount[customListLookupById[task.list_id_fk.toString()]] = 0
        
      } else {
          if (task.completed !== true) {
            storeCount['Tasks'] += 1;
          }
      }

      if (task.important === true && task.completed !== true) {
        storeCount['Important'] += 1;
      }

      if (task.due !== null && task.completed !== true) {
        storeCount['Planned'] += 1;
      }

      if (task.my_day === true && task.completed !== true) {
        storeCount["My Day"] += 1;
      }

    });
  }
  console.log('STORE COUNT: ', storeCount)
  return storeCount
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