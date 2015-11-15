import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Layout from 'views/layout'
import Login from 'views/pages/auth'


export function start () {
    ReactDOM.render(
        <Router history={createBrowserHistory()}>
            <Route path="/" component={Layout}>
            </Route>
            <Route path="/login" component={Login}/>
        </Router>,
        document.getElementById('app')
    )
}

export default { start }