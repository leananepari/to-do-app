import { dashboard } from '../actions'; 
import soundFile from '../../assets/completed-sound.wav';
import { mapTaskList, mapCustomList } from '../../utils/helpers';

const initialState = {
  taskList: [],
  categories: ["My Day", "Important", "Planned", "Tasks"],
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
  lists: [],
  customListLookupByName: {},
  customListLookupById: {}, 
  selectedTab: 'Tasks',
  audio: new Audio(soundFile),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case dashboard.GET_TASK_LIST_START:
      return {
        ...state,
      }

    case dashboard.GET_TASK_LIST_SUCCESS:
      let list = action.payload;
      list.reverse();

      return {
        ...state,
        taskList: list
      }

    case dashboard.GET_TASK_LIST_FAILURE: 
      return {
        ...state,
        isLoading: false
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

      return {
        ...state,
        lists: mapCustomList(state.lists, action.payload),
        customListLookupByName: {...state.customListLookupByName, 
                                [action.payload['name']]: action.payload},
        customListLookupById: {...state.customListLookupById, 
                              [action.payload['list_id']]: action.payload['name']},
      }

    case dashboard.CREATE_NEW_CUSTOM_LIST:

      return {
        ...state,
        lists: [...state.lists, action.payload],
        customListLookupByName: {...state.customListLookupByName, 
                                [action.payload['name']]: action.payload},
        customListLookupById: {...state.customListLookupById, 
                              [action.payload['list_id']]: action.payload['name']}
      }
    
    case dashboard.ADD_TASK_SUCCESS:
      let updatedListAddTask = [action.payload, ...state.taskList];

      return {
        ...state,
        taskList: updatedListAddTask,
      }

    case dashboard.UPDATE_TASK_NAME_CHANGE_SUCCESS:

      return {
        ...state,
        taskList: mapTaskList(state.taskList, action.payload)
      }

    case dashboard.UPDATE_TASK_MARKED_SUCCESS:
      let updatedListWhenMarked = mapTaskList(state.taskList, action.payload);

      return {
        ...state,
        taskList: updatedListWhenMarked,
      }

    case dashboard.UPDATE_TASK_UNMARKED_SUCCESS:
      let updatedListWhenUnmarked = mapTaskList(state.taskList, action.payload);

      return {
        ...state,
        taskList: updatedListWhenUnmarked,
      }

    case dashboard.UPDATE_TASK_IMPORTANT_SUCCESS:
      let updatedListWhenImportant = mapTaskList(state.taskList, action.payload);

      return {
        ...state,
        taskList: updatedListWhenImportant,
      }

    case dashboard.UPDATE_TASK_UNIMPORTANT_SUCCESS:
      let updatedListWhenUnimportant = mapTaskList(state.taskList, action.payload);

      return {
        ...state,
        taskList: updatedListWhenUnimportant
      }

    case dashboard.DELETE_TASK_SUCCESS:
      let updatedListDeleteTask = state.taskList.filter(task => task.task_id !== action.payload);

      return {
        ...state,
        taskList: updatedListDeleteTask
      }

    
    case dashboard.DELETE_CUSTOM_LIST_SUCCESS:
      let i;
      state.lists.forEach((l, index) => {
        if(l.list_id === action.payload) {
          i = index
        }
      })
      return {
        ...state,
        selectedTab: i === 0 ? "Tasks" : state.lists[i - 1]['name'],
        lists: state.lists.filter(l => l.list_id !== action.payload),
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