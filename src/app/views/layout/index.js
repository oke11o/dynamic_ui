import { Styles } from 'material-ui'
import { Link } from 'react-router'

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

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        }
    }

    render() {
        console.log(this.props.children);
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

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;