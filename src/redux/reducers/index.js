// import { category_lookup } from '../../data';

const initialState = {
  user: {},
  taskList: [],
  categories: [],
  categoryCount: [],
  reload: false,
  loginFailure: false,
  signupFailure: false,
  category_lookup: {},
  category_id_lookup: {}
}

export const reducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'GET_TASK_LIST_START':
      return {
        ...state,
        isLoading: true,
        error: ''
      }

    case 'SET_CATEGORIES':
      let name_lookup = {};
      let id_lookup = {};
      action.payload.forEach((category) => {
        name_lookup[category['category_id']] = category['category_name'];
        id_lookup[category['category_name']] = category['category_id'];
      })
      return {
        ...state,
        category_lookup: name_lookup,
        category_id_lookup: id_lookup
      }
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'GET_TASK_LIST_SUCCESS':
      let list = action.payload;

      //get todo's categories by traversing the todo list
      let categoriesSet = new Set();
      categoriesSet.add("My Day");
      let storeCount = {};
      storeCount["My Day"] = list.length;
      let countImportant = 0;

      if (list.length > 0) {
        list.forEach(todo => {
          categoriesSet.add(state.category_lookup[todo.category_id_fk.toString()]);
          if (storeCount.hasOwnProperty(state.category_lookup[todo.category_id_fk.toString()])) {
            storeCount[state.category_lookup[todo.category_id_fk.toString()]] += 1;
          } else {
            storeCount[state.category_lookup[todo.category_id_fk.toString()]] = 1;
          }
          if (todo.important === true) {
            countImportant ++;
          }
        });
      }
      //convert set to array
      let categoriesArr = Array.from(categoriesSet);
      if (list.length > 0) {
        if (countImportant > 0) {
          storeCount["Important"] = countImportant;
          categoriesArr.push("Important");
        }
      }

      return {
        ...state,
        taskList: list,
        categories: categoriesArr,
        categoryCount: storeCount,
        isLoading: false,
        error: ''
      }

    case 'GET_TASK_LIST_FAILURE': 
      return {
        ...state,
      }

    case 'UPDATE_TASK_START':
      return {
        ...state
      }

    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        reload: !state.reload
      }
    
    case 'UPDATE_TASK_FAILURE':
      return {
        ...state
      }

    case 'ADD_TASK_START':
      return {
        ...state
      }

    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        reload: !state.reload
      }

    case 'ADD_TASK_FAILURE':
      return {
        ...state
      }
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loginFailure: true
      }
    
    case 'SET_LOGIN_FAILURE_FALSE':
      return {
        ...state,
        loginFailure: false
      }
    
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        signupFailure: true
      }
    
    case 'SET_SIGNUP_FAILURE_FALSE':
      return {
        ...state,
        signupFailure: false
      }

    default:
      return state;
  }
  
}

