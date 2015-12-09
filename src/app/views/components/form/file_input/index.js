import TextField from 'material-ui/lib/text-field'
import ColHelper from './../../helpers/col'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import Colors from 'material-ui/lib/styles/colors'

class FileUpdloadComponent extends React.Component {
    constructor () {
        super();
        this.state = {
            name_file: ''
        }
    }
    render() {
        return (
            <div style={{position:'relative', display: 'inline-block', width: '100%'}}>
                <TextField
                    hintText="file"
                    onClick={this._onClickInput.bind(this)}
                    style={{float:'left'}}
                    disabled
                    underlineDisabledStyle={{borderBottom: 'solid 1px #e0e0e0'}}
                    value={this.state.name_file}
                    fullWidth/>
                <FlatButton
                    label="upload"
                    style={{position:'absolute', right: 0}}
                    hintText="upload"
                    primary={this.props.primary}>
                    <input type="file" id="file" ref="input_file" onChange={this._onChangeFile.bind(this)} style={{position:'absolute', bottom: 0, top: 0, right: 0, left: 0, width: '100%', opacity: 0}}  />
                    <FontIcon
                        style={{top: '6px', right: '6px'}}
                        className="material-icons">file_upload</FontIcon>
                </FlatButton>
            </div>
        )
    }

    _onClickInput () {
        ReactDOM.findDOMNode(this.refs.input_file).click();
    }
    _onChangeFile (e) {
        var filename = e.target.value.replace(/^.*[\\\/]/, '');
        this.setState({
            name_file: filename
        })
    }
}

export default ColHelper(FileUpdloadComponent)
