import { AppBar } from 'material-ui'

var title;

if (window.config_dui && window.config_dui.title) {
    title = window.config_dui.title;
}

class Header extends React.Component {
    render () {
        return (
            <AppBar
                title={title}
                zDepth={0}/>
        )
    }
}

export default Header