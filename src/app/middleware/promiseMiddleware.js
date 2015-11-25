
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
            const RESPONSE = res.data;

            if (RESPONSE.errorCode !== 0) {
                next({
                    params,
                    errorCode   : RESPONSE.errorCode,
                    errorMessage: RESPONSE.errorMessage,
                    type        : FAILURE
                });

                if (global) {
                    next({
                        type        : 'PAGE_LOADING_FAILED',
                        errorCode   : RESPONSE.errorCode,
                        errorMessage: RESPONSE.errorMessage
                    });
                }

            }
            next({
                params,
                data  : RESPONSE.result,
                type  : SUCCESS
            });


            if (global) {
                next({
                    type: 'PAGE_LOADING_COMPLETED'
                });
            }

        }).catch((e) => {


        });
    }
}