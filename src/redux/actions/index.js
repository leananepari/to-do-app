import { axiosWithAuth } from '../../utils/AxiosWithAuth';
import qs from 'qs';


export const getTaskList = ( userId, history ) => {
  return dispatch => {
    dispatch({ type: 'GET_TASK_LIST_START' });

    axiosWithAuth().get(`/api/tasks/all/${userId}`, qs.stringify({ grant_type: 'password' }))
      .then(response => {

        dispatch({ type: 'GET_TASK_LIST_SUCCESS', payload: response.data })
      })
      .catch(error => {
        dispatch({ type: 'GET_TASK_LIST_FAILURE', payload: error })
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        history.push('/login');
      });
  }
}

export const updateTask = ( todo ) => {
  console.log('UPDATE')
  return dispatch => {
    dispatch({ type: 'UPDATE_TASK_START' });

    axiosWithAuth().put('/api/tasks/update', todo)
      .then(response => {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data })
      })
      .catch(error => {
        dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error })
      });
  }
}

export const deleteTask = ( id ) => {
  return dispatch => {
    dispatch({ type: 'DELETE_TASK_START' });

    axiosWithAuth().delete(`/api/tasks/delete/${id}`)
      .then(response => {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });

      })
      .catch(error => {
        dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error})
      });
  }
}

export const addTask = ( newTodo ) => {
  return dispatch => {
    dispatch({ type: 'ADD_TASK_START' });

    axiosWithAuth().post('/api/tasks/add', newTodo)
    .then(response => {
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: response.data })
    })
    .catch(error => {
      dispatch({ type: 'ADD_TASK_FAILURE', payload: error})
    });
  }
}


