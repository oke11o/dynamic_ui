import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import promiseMiddleware from 'middleware/promiseMiddleware'
import rootReducer from 'reducers'

var createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk, promiseMiddleware
    )
)(createStore);


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