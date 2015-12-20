import { Styles } from 'material-ui'
import { Link } from 'react-router'

import './styles.scss'
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import MenuActions from 'actions/menu'
import ContentActions from 'actions/content'
import Connect from 'react-redux/lib/components/connect'

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

    componentWillReceiveProps () {

    }

    componentWillMount () {
        this.props.dispatch(MenuActions.fetch_menu());
        this.context.history.listen((location, routes) => {
            this.props.dispatch({
                type: 'ROUTE',
                routes: routes,
                history: this.context.history
            })
        })
    }

    render() {
        return (
            <div style={{backgroundColor:"#fff"}}>
                <Header/>
                <Content>
                    {this.props.children}
                </Content>
                <Sidebar dispatch={this.props.dispatch}  items={this.props.menu}/>
            </div>
        )
    }
}

App.contextTypes = {
    history: React.PropTypes.object
};

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Connect(state => ({
    menu: state.menu.get('items')
}))(App);