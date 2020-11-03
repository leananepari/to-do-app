import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';


export const getTaskList = ( userId, history ) => {

  return dispatch => {
    dispatch({ type: 'GET_TASK_LIST_START' });

    axiosWithAuth().get(`/api/lists/all/${userId}`)
      .then(response => {
        dispatch({ type: 'GET_CUSTOM_LISTS', payload: response.data })
      })
      .then(() => {
          axiosWithAuth().get(`/api/tasks/all/${userId}`, qs.stringify({ grant_type: 'password' }))
            .then(response => {
              dispatch({ type: 'GET_TASK_LIST_SUCCESS', payload: response.data })
            })
            .catch(error => {
              dispatch({ type: 'GET_TASK_LIST_FAILURE', payload: error });
              localStorage.removeItem('token');
              localStorage.removeItem('tokenType');
              history.push('/login');
            });
      })
      .catch(error => {
        dispatch({ type: 'ADD_TASK_FAILURE', payload: error});
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });

  }
}

export const updateTask = ( todo, history ) => {
  console.log('ACTION updateTask', todo)

  return dispatch => {

    axiosWithAuth().put('/api/tasks/update', todo)
      .then(response => {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const deleteTask = ( id, history ) => {

  return dispatch => {

    axiosWithAuth().delete(`/api/tasks/delete/${id}`)
      .then(response => {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });

      })
      .catch(error => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const addTask = ( newTodo, history ) => {

  return dispatch => {

    axiosWithAuth().post('/api/tasks/add', newTodo)
      .then(response => {
        dispatch({ type: 'ADD_TASK_SUCCESS', payload: response.data })
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const createList = ( newList, setSelectedTab ) => {

  return dispatch => {

    axiosWithAuth().post('/api/lists/add', newList)
      .then(response => {
        dispatch({ type: 'CREATE_NEW_LIST', payload: response.data });
        setSelectedTab(newList['name']);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const updateList = ( list ) => {

  return dispatch => {
    axiosWithAuth().put('/api/lists/update', list)
      .then(response => {
        dispatch({ type: 'UPDATE_LIST_SUCCESS', payload: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const deleteList = ( listId ) => {

  return dispatch => {
    axiosWithAuth().delete(`/api/lists/delete/${listId}`)
      .then(response => {
        dispatch({ type: 'DELETE_LIST_SUCCESS' })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const getCustomLists = ( userId ) => {

  return dispatch => {

    axiosWithAuth().get(`/api/lists/all/${userId}`)
      .then(response => {
        dispatch({ type: 'GET_CUSTOM_LISTS', payload: response.data })
      })
      .catch(error => {
        console.log(error);
      })
  }
}

 
/* ========================
 Authentication
 ========================== */

export const login = (user, history) => {

  return dispatch => {

    dispatch({ type: 'LOGIN_START' });

    axiosWithAuth().post('/login', qs.stringify({ ...user, grant_type: 'password' }))
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tokenType", response.data.token_type);
        return getUserInfo()();
    })
    .then(user => {
      dispatch({ type: 'SET_USER', payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      history.push('/');
    })
    .catch(error => {
      dispatch({ type: 'LOGIN_FAILURE' })
    });
  }
}

export const signup = ( newUser, history ) => {

  return dispatch => {

    dispatch({ type: 'SIGNUP_START' });

    axiosWithAuth().post('/createnewuser', newUser)
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tokenType", response.data.token_type);
      console.log('RESPONSE data', response)
      return getUserInfo()();

    })
    .then(user => {
      dispatch({ type: 'SET_USER', payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      history.push('/');
    })
    .catch(error => {
      console.log('Error', error)
      dispatch({ type: 'SIGNUP_FAILURE' })
    });
  }
}

const getUserInfo = () => () => {

  return new Promise((resolve, reject) => {
    axiosWithAuth().get('/users/getuserinfo')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log('Could not get user info', error);
        reject(error);
      });
  });
};

export const logout = (history) => {
  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('user');
    history.push("/login");
  }
}

export const setLoginFailureFalse = () => {
  return dispatch => {
    dispatch({ type: 'SET_LOGIN_FAILURE_FALSE' })
  }
}

export const setSignupFailureFalse = () => {
  return dispatch => {
    dispatch({ type: 'SET_SIGNUP_FAILURE_FALSE' })
  }
}

//================================================/

export const setSelectedTodo = ( todo ) => {
  return dispatch => {
    dispatch({ type: 'SET_SELECTED_TODO', payload: todo})
  }
}

export const setEditWindow = ( bool ) => {
  return dispatch => {
    dispatch({ type: 'SET_EDIT_WINDOW', payload: bool})
  }
}

export const setEditTodo = ( todo ) => {
  return dispatch => {
    dispatch({ type: 'SET_EDIT_TODO', payload: todo })
  }
}