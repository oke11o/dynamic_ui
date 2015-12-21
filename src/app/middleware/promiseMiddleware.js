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

            if (Object.prototype.toString.call(RESPONSE) !== '[object Array]') {
                next({
                    params,
                    type: FAILURE
                })
            }

            next({
                params,
                data: RESPONSE,
                type: SUCCESS
            });

            next({
                type: 'REQUEST_COMPLETED',
                data: {
                    id: req_id,
                    type: type_req
                }
            });

            if (redirectTo) {
                store.getState().history.get('history').pushState(null, redirectTo);
            }


            if (global) {
                next({
                    type: 'PAGE_LOADING_COMPLETED'
                });
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