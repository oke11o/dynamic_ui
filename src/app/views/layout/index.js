import { Styles } from 'material-ui'

import './styles.scss'
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'

var { ThemeManager, LightRawTheme } = Styles;

var myRawTheme = LightRawTheme;

myRawTheme.palette.primary1Color = Styles.Colors.blue600;


class App extends React.Component {

    constructor() {
        super();

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(myRawTheme)
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
        return (
            <div style={{backgroundColor:"#fff"}}>
                <Header/>
                <Content>
                    {this.props.children}
                </Content>
                <Sidebar/>
            </div>
        )
    }
}
export default App;