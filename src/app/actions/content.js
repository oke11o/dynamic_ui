import {API, ActionType} from 'constants/content'
import _has from 'lodash.has'
export default {
    fetch_content (current_location) {
        var promise = Request.get(`${current_location.pathname}`, current_location.query);
        if (_has(current_location.state, 'method') && current_location.state.method === 'POST' &&  _has(current_location.state, 'data')) {
            promise = Request.easy('POST', current_location.pathname).send(current_location.state.data);
        }

        return {
            types  : [ActionType.FETCH_CONTENT, ActionType.FETCH_CONTENT_COMPLETED, ActionType.FETCH_CONTENT_FAILED],
            promise,
            global: true
        }
    },

    push_data (attr) {
        return {
            types  : [ActionType.PUSH_DATA, ActionType.PUSH_DATA_COMPLETED, ActionType.PUSH_DATA_FAILED],
            promise: Request.easy('POST', attr.to).send(attr.data).on('progress', e => {
                console.log('Percentage done: ', e.percent);
            }),
            params : {
                key        : attr.key,
                destination: attr.destination
            },
            redirectTo: attr.redirect_to
        }
    },

    refresh_req (location, params = {}) {
        return {
            types: [ActionType.REFRESH_REQUEST, ActionType.REFRESH_REQUEST_COMPLETED, ActionType.REFRESH_REQUEST_FAILED],
            promise: Request.get(`${location}`),
            params
        }
    }
}