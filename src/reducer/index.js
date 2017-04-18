import {combineReducers} from 'redux';
import supplier from './supplier';
import authentication from './authentication';
import awards from './awards';
import events from './events';
import items from './items';
import locations from './locations';
import notifications from './notifications';
import tasks from './tasks';
import dashboard from './dashboard';
import images from './images';

import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  supplier,
  authentication,
  awards,
  events,
  items,
  locations,
  notifications,
  tasks,
  dashboard,
  images,
  router: routerReducer,
  form: formReducer
});
