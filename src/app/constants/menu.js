import keyMirror from 'keymirror'

export const API = {
    FETCH_MENU: '/get-menu'
};

export const ActionType = keyMirror({
    FETCH_MENU          : null,
    FETCH_MENU_COMPLETED: null,
    FETCH_MENU_FAILED   : null
});