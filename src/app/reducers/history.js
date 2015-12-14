const initialState = Immutable.Map({
    router: {},
    history: {}
});

export default function history(state = initialState, action) {
    switch (action.type) {
        case 'ROUTE':
            return state.set('router', action.routes).set('history', action.history);

        default:
            return state
    }
}