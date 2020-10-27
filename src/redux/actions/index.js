import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';


export const getTaskList = ( userId, history ) => {
  return dispatch => {
    dispatch({ type: 'GET_TASK_LIST_START' });

    axiosWithAuth().get('/api/categories')
      .then(response => {
        dispatch({ type: 'SET_CATEGORIES', payload: response.data })
      })
      .then(() => {
          axiosWithAuth().get(`/api/tasks/all/${userId}`, qs.stringify({ grant_type: 'password' }))
            .then(response => {
              dispatch({ type: 'GET_TASK_LIST_SUCCESS', payload: response.data })
              console.log('TASKS: ', response.data)
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
  
      console.log("response data login", response.data)
      return getUserInfo()();
    })
    .then(user => {
      dispatch({ type: 'SET_USER', payload: user });
      console.log('Successful login', user);
      localStorage.setItem("user", JSON.stringify(user));
      history.push('/');
    })
    .catch(error => {
      console.log('Login failed', error);
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
      console.log('Successful login', user);
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
        console.log("DEBUGG LOGIN getUserInfo", response)
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