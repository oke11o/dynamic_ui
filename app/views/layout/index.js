import {Styles, AppBar} from 'material-ui'

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
            <AppBar title="Default"/>
        )
    }
}

export default App