import TextField from 'material-ui/lib/text-field'
import ColHelper from './../../helpers/col'


class Input extends React.Component {
    render() {
        return (
            <TextField
                hintText={this.props.hintText}
                floatingLabelText={this.props.label}
                floatingLabelStyle={this.props.labelStyle}
                hintStyle={this.props.hintStyle}
                multiLine={this.props.multiLine}
                defaultValue={this.props.defaultValue}
                underlineStyle={this.props.underlineStyle}
                value={this.props.value}
                underlineFocusStyle={this.props.underlineFocusStyle}
                underlineDisabledStyle={this.props.underlineDisabledStyle}
                fullWidth
                errorText={this.props.errorText}
                errorStyle={this.props.errorStyle}
                disabled={this.props.disabled}
                type={this.props.type}/>
        )
    }
}


// TODO pattern, regexp
if (_DEVELOPMENT_) {
    Input.propTypes = {}
}

export default ColHelper(Input)
