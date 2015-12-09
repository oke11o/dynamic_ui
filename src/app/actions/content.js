import {API, ActionType} from 'constants/content'
import Req from '@altarix/pxl-webapiutil/lib/wrap-promise-superagent'

export default {
    fetch_content (current_location) {
        return {
            types  : [ActionType.FETCH_CONTENT, ActionType.FETCH_CONTENT_COMPLETED, ActionType.FETCH_CONTENT_FAILED],
            promise: Request.get(`${current_location.pathname}`, current_location.query)
        }
    },

    push_data (attr) {
        return {
            types  : [ActionType.PUSH_DATA, ActionType.PUSH_DATA_COMPLETED, ActionType.PUSH_DATA_FAILED],
            promise: Req.post('http://integration.if.dzhvakin.sbox.alx:8092/api/data/process-upload').send(attr.data).on('progress', e => {
                console.log('Percentage done: ', e.percent);
            }),
            params : {
                key        : attr.key,
                destination: attr.destination
            }
        }
    }
}