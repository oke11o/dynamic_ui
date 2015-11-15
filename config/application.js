import InjectTapEventPlugin from 'react-tap-event-plugin'
import Routes from './routes.js'


InjectTapEventPlugin();

if (module.hot) {
    module.hot.accept();
}
Routes.start();