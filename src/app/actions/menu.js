import {API, ActionType} from 'constants/menu.js'

export default {
    fetch_menu () {
        return {
            types  : [ActionType.FETCH_MENU, ActionType.FETCH_MENU_COMPLETED, ActionType.FETCH_MENU_FAILED],
            promise: Request.get(API.FETCH_MENU)
        }
    }
}