import {ActionType} from 'constants/content'

const initialState = Immutable.Map({
    components: []
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
            var components = state.get('components');

            console.log(getComponentById(components, action.params.destination));
            return state;

        case ActionType.PUSH_DATA_FAILED:
            return state;

        default:
            return state;
    }
}


function getComponentById (components, id) {
    return components.map(component => {
        if (typeof component.id !== 'undefined' && component.id === id) {
            return component;
        } else {
            return getComponentById(component, id);
        }
    });
}