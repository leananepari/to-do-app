
const initialState = {
  user: {},
  taskList: [],
  categories: [],
  categoryCount: [],
  reload: false,
  loginFailure: false,
  signupFailure: false,
  category_lookup: {},
  category_id_lookup: {},
  selectedTodo: '',
  editWindow: false,
  editTodo: {"description": '', 
             "category_id_fk": '', 
             "important": false, 
             "completed": false, 
             "created": "",
             "due": "",
             'user_id_fk': '',
             'task_id': '',
            },
  editTodoCategory: '',
  isLoading: false,
  error: '',
  customLists: [],
  customListLookupByName: {},
  customListLookupById: {}
}

export const reducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'GET_TASK_LIST_START':
      return {
        ...state,
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

    case 'GET_TASK_LIST_SUCCESS':
      let list = action.payload;

      //get todo's categories by traversing the todo list
      let categoriesSet = new Set();
      categoriesSet.add("My Day");
      categoriesSet.add("Important");
      categoriesSet.add("Planned");
      categoriesSet.add("Tasks");


      let storeCount = {};
      // storeCount["Tasks"] = list.length;
      let countImportant = 0;

      if (list.length > 0) {
        list.forEach(todo => {
          if (todo.list_id_fk !== null) {
            console.log('NOT NULL')
            // categoriesSet.add(state.customListLookupById[todo.list_id_fk.toString()]);
            if (storeCount.hasOwnProperty(state.customListLookupById[todo.list_id_fk.toString()])) {
              storeCount[state.customListLookupById[todo.list_id_fk.toString()]] += 1;
            } else {
              storeCount[state.customListLookupById[todo.list_id_fk.toString()]] = 1;
            }
          } else {
            if (storeCount['Tasks']) {
              storeCount['Tasks'] += 1;
            } else {
              storeCount['Tasks'] = 1;
            } 
          }
          if (todo.important === true) {
            countImportant ++;
          }
          if (todo.due !== null) {
            if (storeCount['Planned']) {
              storeCount['Planned'] += 1;
            } else {
              storeCount['Planned'] += 1;
            }
          }
          if (todo.my_day === true) {
            if (storeCount["My Day"]) {
              storeCount["My Day"] += 1;
            } else {
              storeCount["My Day"] = 1;
            }
          }
        });
      }
      list.reverse();
      
      //convert set to array
      let categoriesArr = Array.from(categoriesSet);

      if (countImportant > 0) {
        storeCount["Important"] = countImportant;
      }

      return {
        ...state,
        taskList: list,
        categories: categoriesArr,
        categoryCount: storeCount,
        error: ''
      }

    case 'GET_TASK_LIST_FAILURE': 
      return {
        ...state,
        isLoading: false,
        error: 'Error'
      }

    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        reload: !state.reload,
      }
    
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        reload: !state.reload
      }

    case 'LOGIN_START':
    case 'SIGNUP_START':
      return {
        ...state,
        isLoading: true
      }

    case 'SET_USER':
      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,
        signupFailure: true
      }
    
    case 'SET_SIGNUP_FAILURE_FALSE':
      return {
        ...state,
        signupFailure: false
      }
    
    case 'SET_SELECTED_TODO':
      return {
        ...state,
        selectedTodo: action.payload
      }

    case 'SET_EDIT_WINDOW':
      return {
        ...state,
        editWindow: action.payload
      }

    case 'SET_EDIT_TODO':
      return {
        ...state,
        selectedTodo: action.payload,
        editTodoCategory: state.category_lookup[action.payload.category_id_fk]
      }
    
    case 'CREATE_NEW_LIST':
      return {
        ...state,
        reload: !state.reload
      }
    
    case 'GET_CUSTOM_LISTS':
      let lookupByListName = {};
      let lookupById = {};
      action.payload.forEach(item => {
        lookupByListName[item.name] = item;
        lookupById[item['list_id']] = item.name;
      })

      return {
        ...state,
        customLists: action.payload,
        customListLookupByName: lookupByListName,
        customListLookupById: lookupById
      }

    default:
      return state;
  }
  
}

