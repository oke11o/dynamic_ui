import {ActionType} from 'constants/request'

const initialState = Immutable.Map({
    requests: Immutable.List()
});

const RequestRecord = Immutable.Record({
    id      : undefined,
    type    : undefined,
    instance: undefined
});

export default function request(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST:
            return state.set('requests', state.get('requests').push(new RequestRecord(action.data)));

        case ActionType.REQUEST_COMPLETED:
            return deleteRequest(state, action.data.id);

        case ActionType.REQUEST_REJECT:
            // TODO reject on id
            if (action.data.type.length > 0) {
                state.get('requests').filter(request => request.get('type') === action.data.type).forEach(request => {
                    request.get('instance').abort();
                });
                return deleteRequest(state, null, action.data.type);
            }
            return deleteRequest(state, action.data.id);

        default:
            return state;
    }
}

function deleteRequest(state, id, type = '') {
    if (type.length > 0) {
        return state.set('requests', state.get('requests').filter(request => request.get('type') !== type));
    }
    return state.deleteIn(
        ['requests', state.get('requests').findIndex(request => request.get('id') === id)]
    );
}