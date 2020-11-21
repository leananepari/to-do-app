
export const mapTaskList = (list, updatedTask) => {

  return list.map(task => {
    if (task.task_id === updatedTask.task_id) {
      return updatedTask
    }
    return task
  })

}

export const mapCustomList = (list, updatedList) => {

  list.map(list => {
    if (list.list_id === updatedList.list_id) {
      return updatedList
    } else {
      return list
    }
  })
}

export const filterTaskList = {
  "My Day": (list) => list.filter(todo => todo.my_day === true),
  "Important": (list) => list.filter(todo => todo.important === true),
  "Planned": (list) =>  list.filter(todo => todo.due !== null),
  "Tasks": (list) =>  list.filter(todo => todo.list_id_fk === null)
}