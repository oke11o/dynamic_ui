import {ActionType} from 'constants/menu'


const MenuItemRecord = Immutable.Record({
    route: undefined,
    text : undefined
});

const initialState = Immutable.Map({
    items: Immutable.List()
});

export default function menu(state = initialState, action) {
    switch (action.type) {
        case ActionType.FETCH_MENU:
            return state;

        case ActionType.FETCH_MENU_COMPLETED:
            var items = Immutable.List();

            action.data.forEach(item => {
                
                items = items.push(new MenuItemRecord(item));
            });

            return state.set('items', items);

        case ActionType.FETCH_MENU_FAILED:
            return state;

        default:
            return state;
    }
}
