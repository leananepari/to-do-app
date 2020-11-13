// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.
import { combineReducers } from 'redux'; 

import { reducer as authentication } from './authenticationReducer';
import { reducer as dashboard } from './dashboardReducer';

export default combineReducers({
  authentication,
  dashboard
});

