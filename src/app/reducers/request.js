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
            return state.deleteIn(
                ['requests', state.get('requests').findIndex(request => request.get('id') === action.data.id)]
            );

        case ActionType.REQUEST_REJECT:
            return state;

        default:
            return state;
    }
}