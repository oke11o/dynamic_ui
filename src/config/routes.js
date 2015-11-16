import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

import Login from 'views/pages/auth'
const store = configureStore();
const ROUTE_CONFIG = {
    childRoutes: [
        {
            path: '/login',
            component: Login
        }, {
            path: '/',
            component: require('views/layout/index.js').default,
            childRoutes: [
                {
                    path: '*',
                    getComponent (location, cb) {
                        require.ensure([], (require) => {
                            cb(null, require('views/pages/auth/index.js').default)
                        })
                    }
                }
            ]
        }
    ]
};

export function start() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={createBrowserHistory()} routes={ROUTE_CONFIG}/>
        </Provider>,
        document.getElementById('app')
    )
}

export default {start}