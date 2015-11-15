import { Styles, AppBar } from 'material-ui'

var AppBarStyles  = {
    backgroundColor: Styles.Colors.blue600
};

class Header extends React.Component {
    render () {
        return (
            <AppBar
                style={AppBarStyles}
                title="Title"
                zDepth={0}/>
        )
    }
}

export default Header