import _has from 'lodash.has'

// TODO it's vvveeery bad!!!
var r_id = 0;

export default function promiseMiddleware(store) {
    return (next) => (action) => {

        const { promise,
                  types,
                  global = false,
                  redirect404 = false,
                  params = {},
                  redirectTo = false,
                  type_req = 'content'} = action;


        if (!promise) {
            return next(action);
        }


        const [REQUEST, SUCCESS, FAILURE] = types;


        if (global) {
            next({type: 'PAGE_LOADING'});
        }

        const req_id = ++r_id;


        next({params, type: REQUEST});
        next({
            type: 'REQUEST',
            data: {
                id: req_id,
                type: type_req,
                instance: promise
            }
        });
        return promise.then((res) => {
            const RESPONSE = res.body;

            if (!_has(RESPONSE, 'status')) {
                throw new Error('API not returned data of the format JSEND');
            }

            const STATUS = RESPONSE.status;



            // TODO catch response with status fail and error. Need fix!
            switch (STATUS) {
                case 'success':

                    if (!_has(RESPONSE, 'data')) throw new Error('API not returned response data of the format JSEND');

                    next({
                        params,
                        data: RESPONSE.data,
                        type: SUCCESS
                    });
                    next({
                        type: 'REQUEST_COMPLETED',
                        data: {
                            id: req_id,
                            type: type_req
                        }
                    });


                    if (global) {
                        next({
                            type: 'PAGE_LOADING_COMPLETED'
                        });
                    }

                    if (redirectTo) {
                        store.getState().history.get('history').pushState(null, redirectTo);
                    }

                    break;

                case 'fail':
                case 'error':
                    next({
                        params,
                        type: FAILURE
                    });

                    next({
                        type: 'PAGE_LOADING_FAILED'
                    });
                    break;
            }


            return null
        }).catch((e) => {
            next({
                params,
                type: FAILURE
            });
            next({
                type: 'PAGE_LOADING_FAILED'
            });

        }).error(e => {
            console.error(e);
        });
    }
}