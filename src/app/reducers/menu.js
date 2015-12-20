import {ActionType} from 'constants/menu'



const initialState = Immutable.Map({
    items: []
});

export default function menu(state = initialState, action) {
    switch (action.type) {
        case ActionType.FETCH_MENU:
            return state;

        case ActionType.FETCH_MENU_COMPLETED:

            return state.set('items', action.data);

        case ActionType.FETCH_MENU_FAILED:
            return state;

        default:
            return state;
    }
}
