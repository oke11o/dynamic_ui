import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ColHelper from './../helpers/col'

class Button extends React.Component {
    render() {
        switch (true) {
            case this.props.flat:
                return <FlatButton
                    style={this.props.style}
                    label={this.props.label}
                    primary={this.props.primary}
                    secondary={this.props.secondary}/>;
                break;

            case this.props.floating:
                return <FloatingActionButton
                    style={this.props.style}
                    label={this.props.label}
                    primary={this.props.primary}
                    mini={this.props.mini}
                    secondary={this.props.secondary}/>;
                break;

            default:
                return <RaisedButton
                    style={this.props.style}
                    label={this.props.label}
                    primary={this.props.primary}
                    secondary={this.props.secondary}/>;
        }
    }


}

if (_DEVELOPMENT_) {
    Button.propTypes = {
        label    : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        flat     : React.PropTypes.bool,
        raised   : React.PropTypes.bool,
        floating : React.PropTypes.bool,
        primary  : React.PropTypes.bool,
        secondary: React.PropTypes.bool,
        style: React.PropTypes.object
    };
}


export default ColHelper(Button);
