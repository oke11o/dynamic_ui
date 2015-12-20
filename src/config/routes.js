import { Router, Route, Link } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'

import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

import Login from 'views/pages/auth'
import DynamicPage from 'views/pages/dynamic'
import Layout from 'views/layout'

const store = configureStore();
const ROUTE_CONFIG = {
    childRoutes: [
        {
            path: '/login',
            component: Login
        }, {
            path: '/',
            component: Layout,
            indexRoute: {
                component: DynamicPage
            },
            childRoutes: [
                {
                    path: '*',
                    component: DynamicPage
                }
            ]
        }
    ]
};

export function start() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={createHashHistory()} routes={ROUTE_CONFIG}/>
        </Provider>,
        document.getElementById('app')
    )
}

export default {start}