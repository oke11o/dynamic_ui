import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

import Layout from 'views/layout'
import Login from 'views/pages/auth'

const store = configureStore();

export function start() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={createBrowserHistory()}>
                <Route path="/" component={Layout}>

                </Route>
                <Route path="/login" component={Login}/>
            </Router>
        </Provider>,
        document.getElementById('app')
    )
}

export default {start}