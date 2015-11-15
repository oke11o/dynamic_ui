import './styles.scss'
import {Styles, AppBar, Menu, MenuItem} from 'material-ui'
import mui from 'material-ui'
const ThemeManager  = Styles.ThemeManager;
const LightRawTheme = Styles.LightRawTheme;

var AppBarStyles = {
    backgroundColor: Styles.Colors.blue600
};
var MenuStyles = {
    borderTop: "none",
    overflow: "hidden",
    position: "absolute",
    top: "64px",
    width: "192px"
};
var ContentStyles = {
    borderLeft: "solid 1px #e0e0e0",
    boxSizing: "border-box",
    marginLeft: "192px",
    maxWidth: "896px",
    minHeight: "800px",
    padding: "24px 24px 24px 24px"
};

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
        console.log(mui);


        return (
            <div {...this.props}>
                <AppBar
                    style={AppBarStyles}
                    title="Title"
                    zDepth={0}/>
                <div style={ContentStyles}>
                    s
                </div>
                <div style={MenuStyles}>
                    <Menu
                        menuItems={[{route:'/asd', text: 'ss'}]}
                        autoWidth={true}
                        hideable={false}
                        visible={true}
                        zDepth={0}>
                    </Menu>
                </div>
            </div>
        )
    }
}

export default App