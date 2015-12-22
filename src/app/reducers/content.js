import {ActionType} from 'constants/content'

const initialState = Immutable.Map({
    components    : [],
    blocks        : [],
    page_loading  : false,
    refresh_blocks: [],
    requests      : Immutable.List()
});

var RequestRecord = Immutable.Record({
    id      : undefined,
    instance: undefined
});

export default function content(state = initialState, action) {
    switch (action.type) {

        case ActionType.FETCH_CONTENT:
            return state.set('components', []);

        case ActionType.FETCH_CONTENT_COMPLETED:
            return state.set('components', action.data);

        case ActionType.FETCH_CONTENT_FAILED:
            return state;

        case ActionType.PUSH_DATA:
            return state.set('blocks', []);

        case ActionType.PUSH_DATA_COMPLETED:
            let blocks = [];

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
            return state

        case ActionType.REFRESH_REQUEST_COMPLETED:
            let refresh_blocks = [];

            action.data.forEach(component => {
                refresh_blocks.push(Object.assign(component, {id: action.params.destination}));
            });

            return state.set('refresh_blocks', refresh_blocks);

        case ActionType.REFRESH_REQUEST_FAILED:
            return state;


        case ActionType.REQUEST:
            return state.set('requests', state.get('requests').push(new RequestRecord(action.data)));

        case ActionType.REQUEST_COMPLETED:
            return state.set('requests', state.get('re'))

        default:
            return state;
    }
}

