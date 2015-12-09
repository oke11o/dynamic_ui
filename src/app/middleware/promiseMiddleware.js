export default function promiseMiddleware(store) {
    return (next) => (action) => {

        const { promise, types, global = false, redirect404 = false, params = {}} = action;

        if (!promise) {
            return next(action);
        }
        const [REQUEST, SUCCESS, FAILURE] = types;
        if (global) {
            next({type: 'PAGE_LOADING'});
        }
        next({params, type: REQUEST});


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


            if (global) {
                next({
                    type: 'PAGE_LOADING_COMPLETED'
                });
            }

        }).catch((e) => {
            next({
                params,
                type: FAILURE
            });
            next({
                type: 'PAGE_LOADING_FAILED'
            });

            new Error(e);
        });
    }
}