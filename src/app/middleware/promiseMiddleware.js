export default function promiseMiddleware() {
    return (next) => (action) => {
        const { promise, types, global = false, redirect404 = false, ...rest } = action;

        if (!promise) {
            return next(action);
        }
        const [REQUEST, SUCCESS, FAILURE] = types;
        if (global) {
            next({type: 'PAGE_LOADING'});
        }

        next({...rest, type: REQUEST});

        return promise.then((res) => {
            next({
                ...rest,
                data  : res.result,
                type  : SUCCESS
            });
            if (global) {
                next({
                    type: 'PAGE_LOADING_COMPLETED'
                });
            }
        }).catch((err) => {

            next({
                ...rest,
                errorCode   : err.errorCode,
                errorMessage: err.errorMessage,
                type        : FAILURE
            });

            if (global) {
                next({
                    type        : 'PAGE_LOADING_FAILED',
                    errorCode   : err.errorCode,
                    errorMessage: err.errorMessage
                });

            }
            if (redirect404) {

            }

            console.error(err)
        });
    }
}