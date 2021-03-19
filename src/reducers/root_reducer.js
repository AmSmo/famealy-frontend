import { combineReducers } from 'redux';
import user from './user'
import recipes from './recipes'
import message from './message'
const RootReducer = combineReducers({
    user, recipes, message
});

export default RootReducer;