import keyMirror from 'keymirror'

export const ActionType = keyMirror({
    FETCH_CONTENT: null,
    FETCH_CONTENT_COMPLETED: null,
    FETCH_CONTENT_FAILED: null,

    PUSH_DATA: null,
    PUSH_DATA_COMPLETED: null,
    PUSH_DATA_FAILED: null
});