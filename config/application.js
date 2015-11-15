import App from  'views/layout'
import InjectTapEventPlugin from 'react-tap-event-plugin'

InjectTapEventPlugin();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App/>, document.getElementById('app'));