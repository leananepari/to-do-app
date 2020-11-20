import { dashboard } from '../actions'; 
import soundFile from '../../assets/completed-sound.wav';

const initialState = {
  taskList: [],
  categories: ["My Day", "Important", "Planned", "Tasks"],
  categoryCount: {},
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
  customListLookupById: {}, 
  selectedTab: 'Tasks',

  audio: new Audio(soundFile),

  flagImportant: null,
  flagMarked: null,
  flagUnmarked: null,
  flagSelectedTab: null
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
              if (task.completed !== true) {
                storeCount[state.customListLookupById[task.list_id_fk.toString()]] += 1;
              }
            } else {
              if (task.completed !== true) {
                storeCount[state.customListLookupById[task.list_id_fk.toString()]] = 1;
              }
            }
          } else {
              if (task.completed !== true) {
                storeCount['Tasks'] += 1;
              }
          }

          if (task.important === true && task.completed !== true) {
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
      let updatedCategoryCount = {...state.categoryCount};
      state.lists.forEach(l => {
        if (l.list_id === action.payload.list_id) {
          updatedCategoryCount[action.payload.name] = updatedCategoryCount[l['name']];
        }})

      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.list_id === action.payload.list_id) {
            return action.payload
          } else {
            return list
          }
        }),
        customListLookupByName: {...state.customListLookupByName, [action.payload['name']]: action.payload},
        customListLookupById: {...state.customListLookupById, [action.payload['list_id']]: action.payload['name']},
        categoryCount: updatedCategoryCount
      }

    case dashboard.CREATE_NEW_CUSTOM_LIST:

      return {
        ...state,
        lists: [...state.lists, action.payload],
        customListLookupByName: {...state.customListLookupByName, [action.payload['name']]: action.payload},
        customListLookupById: {...state.customListLookupById, [action.payload['list_id']]: action.payload['name']}
      }
    
    case dashboard.ADD_TASK_SUCCESS:
      if (!state.categoryCount[state.flagSelectedTab]) {
        state.categoryCount[state.flagSelectedTab] = 0;
      }

      return {
        ...state,
        taskList: [action.payload, ...state.taskList],
        categoryCount: {...state.categoryCount, [state.flagSelectedTab]: state.categoryCount[state.flagSelectedTab] += 1 }
      }

    case dashboard.UPDATE_TASK_SUCCESS:
      let importantCount = state.categoryCount["Important"];
      if (state.flagImportant !== null) {
        if (state.flagImportant && action.payload.completed !== true) {
          importantCount += 1 
        } else {
          if (state.flagImportant === false && action.payload.completed !== true) {
            importantCount -= 1
          }
        }       
      }
      let taskCount = state.categoryCount[state.flagSelectedTab];
      if (state.flagMarked !== null) {
        taskCount -= 1;
        if (action.payload.important) {
          importantCount -= 1;
        }
      }
      if (state.flagUnmarked !== null) {
        taskCount += 1;
        if (action.payload.important) {
          importantCount += 1;
        }
      }

      return {
        ...state,
        taskList: state.taskList.map(l => {
          if (l.task_id === action.payload.task_id) {
            return action.payload
          }
          return l
        }),
        categoryCount: {...state.categoryCount, ["Important"]: importantCount, [state.flagSelectedTab]: taskCount},
        flagMarked: null,
        flagUnmarked: null,
        flagImportant: null
      }

    case dashboard.DELETE_TASK_SUCCESS:
      let count = state.categoryCount[state.flagSelectedTab];
      state.taskList.forEach(task => {
        if (task.task_id === action.payload) {
          if (!task.completed) {
            count -= 1;
          } 
        }
      })

      return {
        ...state,
        taskList: state.taskList.filter(task => task.task_id !== action.payload),
        categoryCount: {...state.categoryCount, [state.flagSelectedTab]: count}
      }

    
    case dashboard.DELETE_CUSTOM_LIST_SUCCESS:
      let i;
      state.lists.forEach((l, index) => {
        if(l.list_id === action.payload) {
          i = index
        }
      })
      let updatedCount = {...state.categoryCount};
      delete updatedCount[state.customListLookupById[action.payload]];

      return {
        ...state,
        selectedTab: i === 0 ? "Tasks" : state.lists[i - 1]['name'],
        lists: state.lists.filter(l => l.list_id !== action.payload),
        categoryCount: updatedCount
      }

    case dashboard.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload
      }

    case dashboard.SET_FLAG_TAB:
      return {
        ...state,
        flagSelectedTab: action.payload
      }

    case dashboard.SET_FLAG_IMPORTANT:
      return {
        ...state,
        flagImportant: action.payload
      }
    
    case dashboard.SET_FLAG_MARKED:
      return {
        ...state,
        flagMarked: true
      }

    case dashboard.SET_FLAG_UNMARKED:
      return {
        ...state,
        flagUnmarked: false
      }

    default:
      return state;
  }
};