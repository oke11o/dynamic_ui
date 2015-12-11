import {ActionType} from 'constants/content'

const initialState = Immutable.Map({
    components: [],
    blocks: [],
    page_loading: false,
    refresh_blocks: []
});


export default function content(state = initialState, action) {
    switch (action.type) {

    /**
     * TODO
     * for fetch cont
     */
        case ActionType.FETCH_CONTENT:
            return state;

        case ActionType.FETCH_CONTENT_COMPLETED:
            return state.set('components', action.data);

        case ActionType.FETCH_CONTENT_FAILED:
            return state;

        case ActionType.PUSH_DATA:
            return state;

        case ActionType.PUSH_DATA_COMPLETED:
            var blocks = [];

            action.data.forEach(component => {
                blocks.push(Object.assign(component, {id: action.params.destination}));
            });

            return state.set('blocks', blocks);

        case ActionType.PUSH_DATA_FAILED:
            return state;

        case ActionType.PAGE_LOADING:
            return state.set('page_loading', true);

        case ActionType.PAGE_LOADING_COMPLETED:
            return state.set('page_loading', false);

        case ActionType.PAGE_LOADING_FAILED:
            return state.set('page_loading', false);


        case ActionType.REFRESH_REQUEST:
            return state;

        case ActionType.REFRESH_REQUEST_COMPLETED:
            var blocks = [];

            action.data.forEach(component => {
                blocks.push(Object.assign(component, {id: action.params.destination}));
            });

            return state.set('refresh_blocks', blocks);

        case ActionType.REFRESH_REQUEST_FAILED:
            return state;

        default:
            return state;
    }
}

