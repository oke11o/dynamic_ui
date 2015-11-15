const initialState = Immutable.Map({
    router: {},
    history: Immutable.List()
});
// TODO add history session
export default function history(state = initialState, action) {
    switch (action.type) {
        case 'ROUTE':
            return state.set('router', action.res);

        default:
            return state
    }
}