import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import promiseMiddleware from 'middleware/promiseMiddleware'
import rootReducer from 'reducers'

var createStoreWithMiddleware;

if (_DEVELOPMENT_ || _PRODUCTION_DEV_) {
    var createLogger = require('redux-logger');
    const logger = createLogger({
        stateTransformer: (state) => {
            let newState = {};

            for (var i of Object.keys(state)) {
                if (Immutable.Iterable.isIterable(state[i])) {
                    newState[i] = state[i].toJS();
                } else {
                    newState[i] = state[i];
                }
            }

            return newState;
        }
    });
    createStoreWithMiddleware = compose(
        applyMiddleware(
            thunk, promiseMiddleware, logger
        )
    )(createStore);
}

if (_PRODUCTION_) {
    createStoreWithMiddleware = compose(
        applyMiddleware(
            thunk, promiseMiddleware
        )
    )(createStore);
}


export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}