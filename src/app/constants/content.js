import keyMirror from 'keymirror'

export const ActionType = keyMirror({
    FETCH_CONTENT: null,
    FETCH_CONTENT_COMPLETED: null,
    FETCH_CONTENT_FAILED: null,

    PAGE_LOADING: null,
    PAGE_LOADING_COMPLETED: null,
    PAGE_LOADING_FAILED: null,

    REFRESH_REQUEST: null,
    REFRESH_REQUEST_COMPLETED: null,
    REFRESH_REQUEST_FAILED: null,

    PUSH_DATA: null,
    PUSH_DATA_COMPLETED: null,
    PUSH_DATA_FAILED: null


});