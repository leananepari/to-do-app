import { dashboard } from '../actions'; 
import soundFile from '../../assets/completed-sound.wav';
import { mapTaskList, mapCustomList } from '../../utils/helpers';

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

            (storeCount[state.customListLookupById[task.list_id_fk.toString()]] 
             && task.completed !== true) ?
              storeCount[state.customListLookupById[task.list_id_fk.toString()]] += 1
            :
              task.completed !== true ? 
                storeCount[state.customListLookupById[task.list_id_fk.toString()]] = 1
              :
                storeCount[state.customListLookupById[task.list_id_fk.toString()]] = 0
            
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
        lists: mapCustomList(state.lists, action.payload),
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
      if (!state.categoryCount[action.selectedTab]) {
        state.categoryCount[action.selectedTab] = 0;
      }

      return {
        ...state,
        taskList: [action.payload, ...state.taskList],
        categoryCount: {...state.categoryCount, [action.selectedTab]: state.categoryCount[action.selectedTab] += 1 }
      }

    case dashboard.UPDATE_TASK_NAME_CHANGE_SUCCESS:

      return {
        ...state,
        taskList: mapTaskList(state.taskList, action.payload)
      }

    case dashboard.UPDATE_TASK_MARKED_SUCCESS:

      return {
        ...state,
        taskList: mapTaskList(state.taskList, action.payload),
        categoryCount: action.payload.important ? 
        {...state.categoryCount, ["Important"]: state.categoryCount["Important"] -= 1, 
        [action.selectedTab]: state.categoryCount[action.selectedTab] -= 1} :
        {...state.categoryCount, [action.selectedTab]: state.categoryCount[action.selectedTab] -= 1}
      }

    case dashboard.UPDATE_TASK_UNMARKED_SUCCESS:

      return {
        ...state,
        taskList: mapTaskList(state.taskList, action.payload),
        categoryCount: action.payload.important ? 
        {...state.categoryCount, ["Important"]: state.categoryCount["Important"] += 1, 
        [action.selectedTab]: state.categoryCount[action.selectedTab] += 1} :
        {...state.categoryCount, [action.selectedTab]: state.categoryCount[action.selectedTab] += 1}
      }

    case dashboard.UPDATE_TASK_IMPORTANT_SUCCESS:

      return {
        ...state,
        taskList: mapTaskList(state.taskList, action.payload),
        categoryCount: action.payload.completed !== true ? 
        {...state.categoryCount, ["Important"]: state.categoryCount["Important"] += 1} :
        {...state.categoryCount}
      }


    case dashboard.UPDATE_TASK_UNIMPORTANT_SUCCESS:

      return {
        ...state,
        taskList: mapTaskList(state.taskList, action.payload),
        categoryCount: action.payload.completed !== true ? 
        {...state.categoryCount, ["Important"]: state.categoryCount["Important"] -= 1} :
        {...state.categoryCount}
      }

    case dashboard.DELETE_TASK_SUCCESS:
      let count = state.categoryCount[action.selectedTab];
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
        categoryCount: {...state.categoryCount, [action.selectedTab]: count}
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

    default:
      return state;
  }
};