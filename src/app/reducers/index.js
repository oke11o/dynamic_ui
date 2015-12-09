import { combineReducers } from 'redux'

import history from './history'
import content from './content'
import menu from './menu'


export default combineReducers({
    history,
    content,
    menu
});

