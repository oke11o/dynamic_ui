import ThemeManager from 'material-ui/lib/styles/theme-manager'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'


import './styles.scss'
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'



class App extends React.Component {

    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        }
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Header/>
                <Content>
                    {this.props.children}
                </Content>
                <Sidebar/>
            </div>
        )
    }
}

export default Connect()(App);