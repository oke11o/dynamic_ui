const initialState = Immutable.Map({
    content: []
});


export default function content (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}