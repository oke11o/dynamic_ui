import {ActionType} from 'constants/content'

const initialState = Immutable.Map({
    content: []
});


export default function content (state = initialState, action) {
    switch (action.type) {

    /**
     * TODO
     * for fetch cont
     */
        case ActionType.FETCH_CONTENT:
            return state;

        case ActionType.FETCH_CONTENT_COMPLETED:
            return state;

        case ActionType.FETCH_CONTENT_FAILED:
            return state;

        default:
            return state;
    }
}