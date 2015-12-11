import {ActionType} from 'constants/content'

const initialState = Immutable.Map({
    components: [],
    blocks: []
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

        default:
            return state;
    }
}

