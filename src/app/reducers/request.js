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
            let finded_request = state.getIn([
                    'requests',
                    state.get('requests').findIndex(request => request.get('id') === action.data.id),
                    'instance'
                ], Immutable.Map());
            return deleteRequest(state, action.data.id);

        default:
            return state;
    }
}

function deleteRequest(state, id) {
    return state.deleteIn(
        ['requests', state.get('requests').findIndex(request => request.get('id') === id)]
    );
}