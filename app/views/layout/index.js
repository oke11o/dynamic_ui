import './styles.scss'
import {Styles, AppBar, IconButton, Icons} from 'material-ui'

const ThemeManager = Styles.ThemeManager;
const LightRawTheme = Styles.LightRawTheme;

class App extends React.Component {

    constructor () {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        }
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext () {
        return {
            muiTheme: this.state.muiTheme
        }
    }

    render() {
        return (
            <div {...this.props}>
                <AppBar
                    title="Title"
                    iconElementLeft={null}>

                </AppBar>
            </div>
        )
    }
}

export default App