import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'
import ColHelper from './../helpers/col'

class Button extends React.Component {


    render() {
        var icon = null;
        if (this.props.iconName) {
            icon = <FontIcon
                style={Object.assign({top: '6px', right: '6px'}, this.props.iconStyle || {})}
                className="material-icons">{this.props.iconName}</FontIcon>
        }
        switch (true) {
            case this.props.flat:
                return <FlatButton
                    style={this.props.style}
                    label={this.props.label}
                    type={this.props.type}
                    primary={this.props.primary}
                    onTouchTap={this._onClick.bind(this)}
                    secondary={this.props.secondary}>{icon}</FlatButton>;
                break;

            case this.props.floating:
                return <FloatingActionButton
                    style={this.props.style}
                    type={this.props.type}
                    label={this.props.label}
                    primary={this.props.primary}
                    onTouchTap={this._onClick.bind(this)}
                    mini={this.props.mini}
                    secondary={this.props.secondary}>{icon}</FloatingActionButton>;
                break;

            default:
                return <RaisedButton
                    style={this.props.style}
                    type={this.props.type}
                    label={this.props.label}
                    onTouchTap={this._onClick.bind(this)}
                    primary={this.props.primary}
                    secondary={this.props.secondary}>{icon}</RaisedButton>;
        }
    }

    _onClick() {
        if (this.props.href && typeof this.props.href === 'string') {
            if (this.props.href.charAt(0) !== '/') {
                window.location = this.props.href;
            } else {
                this.context.history.pushState(null, this.props.href);
            }
        }
    }

}
Button.contextTypes = {
    history: React.PropTypes.object
};

if (_DEVELOPMENT_) {
    Button.propTypes = {
        label    : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        flat     : React.PropTypes.bool,
        type     : React.PropTypes.string,
        raised   : React.PropTypes.bool,
        floating : React.PropTypes.bool,
        primary  : React.PropTypes.bool,
        secondary: React.PropTypes.bool,
        style    : React.PropTypes.object
    };
}


export default ColHelper(Button);
