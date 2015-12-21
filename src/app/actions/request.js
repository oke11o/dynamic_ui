import {ActionType} from 'constants/request'

export default {
    abortRequests(type, id) {
        return {
            type: ActionType.REQUEST_REJECT,
            data: {
                type,
                id
            }
        }
    }
}