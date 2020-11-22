import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';

export const GET_TASK_LIST_START = 'GET_TASK_LIST_START';
export const GET_CUSTOM_LISTS = 'GET_CUSTOM_LISTS';
export const GET_CUSTOM_LISTS_FAILURE = 'GET_CUSTOM_LISTS_FAILURE';
export const GET_TASK_LIST_SUCCESS = 'GET_TASK_LIST_SUCCESS';
export const GET_TASK_LIST_FAILURE = 'GET_TASK_LIST_FAILURE';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE'
export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';
export const SET_EDIT_WINDOW = 'SET_EDIT_WINDOW';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const CREATE_NEW_CUSTOM_LIST = 'CREATE_NEW_CUSTOM_LIST';
export const UPDATE_CUSTOM_LIST_SUCCESS = 'UPDATE_CUSTOM_LIST_SUCCESS';
export const DELETE_CUSTOM_LIST_SUCCESS = 'DELETE_CUSTOM_LIST_SUCCESS';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const SET_FLAG_TAB = 'SET_FLAG_TAB';
export const SET_FLAG_IMPORTANT = 'SET_FLAG_IMPORTANT';
export const SET_FLAG_MARKED = 'SET_FLAG_MARKED';
export const SET_FLAG_UNMARKED = 'SET_FLAG_UNMARKED';

export const UPDATE_TASK_MARKED_SUCCESS = 'UPDATE_TASK_MARKED_SUCCESS';
export const UPDATE_TASK_MARKED_FAILURE = 'UPDATE_TASK_MARKED_FAILURE';
export const UPDATE_TASK_UNMARKED_SUCCESS = 'UPDATE_TASK_UNMARKED_SUCCESS';
export const UPDATE_TASK_UNMARKED_FAILURE = 'UPDATE_TASK_UNMARKED_FAILURE';
export const UPDATE_TASK_IMPORTANT_SUCCESS = 'UPDATE_TASK_IMPORTANT_SUCCESS';
export const UPDATE_TASK_IMPORTANT_FAILURE = 'UPDATE_TASK_IMPORTANT_FAILURE';
export const UPDATE_TASK_UNIMPORTANT_SUCCESS = 'UPDATE_TASK_UNIMPORTANT_SUCCESS';
export const UPDATE_TASK_UNIMPORTANT_FAILURE = 'UPDATE_TASK_UNIMPORTANT_FAILURE';
export const UPDATE_TASK_NAME_CHANGE_SUCCESS = 'UPDATE_TASK_NAME_CHANGE_SUCCESS';
export const UPDATE_TASK_NAME_CHANGE_FAILURE = 'UPDATE_TASK_NAME_CHANGE_FAILURE';
export const UPDATE_TASK_ADD_TO_MY_DAY_SUCCESS = 'UPDATE_TASK_ADD_TO_MY_DAY_SUCCESS';
export const UPDATE_TASK_ADD_TO_MY_DAY_FAILURE = 'UPDATE_TASK_ADD_TO_MY_DAY_FAILURE';
export const UPDATE_TASK_REMOVE_FROM_MY_DAY_SUCCESS = 'UPDATE_TASK_REMOVE_FROM_MY_DAY_SUCCESS';
export const UPDATE_TASK_REMOVE_FROM_MY_DAY_FAILURE = 'UPDATE_TASK_REMOVE_FROM_MY_DAY_FAILURE';


export const getTaskList = ( userId, history ) => {

  return dispatch => {
    dispatch({ type: GET_TASK_LIST_START });

    axiosWithAuth().get(`/api/lists/all/${userId}`)
      .then(response => {
        dispatch({ type: GET_CUSTOM_LISTS, payload: response.data })
      })
      .then(() => {
          axiosWithAuth().get(`/api/tasks/all/${userId}`, qs.stringify({ grant_type: 'password' }))
            .then(response => {
              dispatch({ type: GET_TASK_LIST_SUCCESS, payload: response.data })
            })
            .catch(error => {
              dispatch({ type: GET_TASK_LIST_FAILURE, payload: error });
              localStorage.removeItem('token');
              localStorage.removeItem('tokenType');
              history.push('/login');
            });
      })
      .catch(error => {
        dispatch({ type: GET_CUSTOM_LISTS_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });

  }
}

export const updateTaskNameChange = ( task, history ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_NAME_CHANGE_SUCCESS, payload: response.data  });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_NAME_CHANGE_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTaskMarked = ( task, history, selectedTab ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_MARKED_SUCCESS, payload: response.data, selectedTab: selectedTab  });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_MARKED_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTaskUnmarked = ( task, history, selectedTab ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_UNMARKED_SUCCESS, payload: response.data, selectedTab: selectedTab });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_UNMARKED_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTaskImportant = ( task, history ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_IMPORTANT_SUCCESS, payload: response.data  });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_IMPORTANT_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTaskUnimportant = ( task, history ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_UNIMPORTANT_SUCCESS, payload: response.data  });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_UNIMPORTANT_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTaskAddToMyDay = ( task, history ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_ADD_TO_MY_DAY_SUCCESS, payload: response.data  });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_ADD_TO_MY_DAY_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTaskRemoveFromMyDay = ( task, history ) => {

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', task)
      .then(response => {
        dispatch({ type: UPDATE_TASK_REMOVE_FROM_MY_DAY_SUCCESS, payload: response.data  });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TASK_REMOVE_FROM_MY_DAY_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const deleteTask = ( id, history, selectedTab ) => {

  return dispatch => {

    axiosWithAuth().delete(`/api/tasks/delete/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TASK_SUCCESS, payload: id, selectedTab: selectedTab });

      })
      .catch(error => {
        dispatch({ type: DELETE_TASK_FAILURE, payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const addTask = ( newTodo, history, selectedTab ) => {

  return dispatch => {

    axiosWithAuth().post('/api/tasks/add', newTodo)
      .then((response) => {
        dispatch({ type: ADD_TASK_SUCCESS, payload: response.data, selectedTab: selectedTab })
      })
      .catch(error => {
        dispatch({ type: ADD_TASK_FAILURE, payload: error })
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}


export const setSelectedTask = ( todo ) => {

  return dispatch => {

    dispatch({ type: SET_SELECTED_TASK, payload: todo})

  }
}

export const setEditWindow = ( bool ) => {

  return dispatch => {

    dispatch({ type: SET_EDIT_WINDOW, payload: bool})

  }
}

export const setEditTask = ( todo ) => {

  return dispatch => {

    dispatch({ type: SET_EDIT_TASK, payload: todo })

  }
}

export const setSelectedTab = ( tab ) => {

  return dispatch => {

    dispatch({ type: SET_SELECTED_TAB, payload: tab })
  }
}

export const setFlagTab = ( tab ) => {

  return dispatch => {

    dispatch({ type: SET_FLAG_TAB, payload: tab })
  }
}

export const setFlagImportant = ( bool ) => {

  return dispatch => {

    dispatch({ type: SET_FLAG_IMPORTANT, payload: bool })
  }
}

export const setFlagMarked = () => {

  return dispatch => {

    dispatch({ type: SET_FLAG_MARKED })
  }
}

export const setFlagUnmarked = () => {

  return dispatch => {

    dispatch({ type: SET_FLAG_UNMARKED })
  }
}


export const createCustomList = ( newList, setSelectedTab ) => {

  return dispatch => {

    axiosWithAuth().post('/api/lists/add', newList)
      .then(response => {
        console.log('NEWWWW LIST', response)
        dispatch({ type: CREATE_NEW_CUSTOM_LIST, payload: response.data });
        setSelectedTab(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const updateCustomList = ( list ) => {

  return dispatch => {

    axiosWithAuth().put('/api/lists/update', list)
      .then(response => {
        dispatch({ type: UPDATE_CUSTOM_LIST_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const deleteCustomList = ( listId ) => {

  return dispatch => {

    axiosWithAuth().delete(`/api/lists/delete/${listId}`)
      .then(() => {
        dispatch({ type: DELETE_CUSTOM_LIST_SUCCESS, payload: listId })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

