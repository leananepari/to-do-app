import { dashboard } from '../actions'; 

const initialState = {
  taskList: [],
  categories: ["My Day", "Important", "Planned", "Tasks"],
  categoryCount: [],
  reload: false,
  category_lookup: {},
  category_id_lookup: {},
  selectedTask: '',
  editWindow: false,
  editTask: {"description": '', 
             "category_id_fk": '', 
             "important": false, 
             "completed": false, 
             "created": "",
             "due": "",
             'user_id_fk': '',
             'task_id': '',
            },
  editTaskCategory: '',
  error: '',
  lists: [],
  customListLookupByName: {},
  customListLookupById: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboard.GET_TASK_LIST_START:
      return {
        ...state,
        error: ''
      }

    case dashboard.GET_TASK_LIST_SUCCESS:
      let list = action.payload;

      let storeCount = {
        "My Day": 0,
        "Important": 0,
        "Planned": 0,
        "Tasks": 0
      };

      if (list.length > 0) {

        list.forEach(task => {

          if (task.list_id_fk !== null) {
            if (storeCount[state.customListLookupById[task.list_id_fk.toString()]]) {
              storeCount[state.customListLookupById[task.list_id_fk.toString()]] += 1;
            } else {
              storeCount[state.customListLookupById[task.list_id_fk.toString()]] = 1;
            }
          } else {
              storeCount['Tasks'] += 1;
          }

          if (task.important === true) {
            storeCount['Important'] += 1;
          }

          if (task.due !== null) {
            storeCount['Planned'] += 1;
          }

          if (task.my_day === true) {
            storeCount["My Day"] += 1;
          }
        });

      }
      
      list.reverse();

      return {
        ...state,
        taskList: list,
        categoryCount: storeCount,
        error: ''
      }

    case dashboard.GET_TASK_LIST_FAILURE: 
      return {
        ...state,
        isLoading: false,
        error: 'Error'
      }
      
    case dashboard.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload
      }

    case dashboard.SET_EDIT_WINDOW:
      return {
        ...state,
        editWindow: action.payload
      }

    case dashboard.SET_EDIT_TASK:
      return {
        ...state,
        selectedTask: action.payload,
        editTaskCategory: state.category_lookup[action.payload.category_id_fk]
      }
    
    case dashboard.GET_CUSTOM_LISTS:
      let lookupByListName = {};
      let lookupById = {};
      action.payload.forEach(item => {
        lookupByListName[item.name] = item;
        lookupById[item['list_id']] = item.name;
      })

      return {
        ...state,
        lists: action.payload,
        customListLookupByName: lookupByListName,
        customListLookupById: lookupById
      }

    case dashboard.UPDATE_CUSTOM_LIST_SUCCESS:
    case dashboard.DELETE_CUSTOM_LIST_SUCCESS:
    case dashboard.ADD_TASK_SUCCESS:
    case dashboard.CREATE_NEW_CUSTOM_LIST:
    case dashboard.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        reload: !state.reload,
      }

    default:
      return state;
  }
};