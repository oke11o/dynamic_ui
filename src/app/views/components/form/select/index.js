import SelectField from 'material-ui/lib/select-field'
import TextField from 'material-ui/lib/text-field'

import ColHelper from './../../helpers/col'
class Select extends React.Component {
    constructor () {
        super();
        this.state = {
            id_selected: null
        }
    }
    render() {
        return (
            <div>
                <SelectField style={this.props.style}
                             hintText={this.props.hintText}
                             valueMember={this.props.valueMember}
                             floatingLabelText={this.props.label}
                             value={this.state.id_selected}
                             name={this.props.name}
                             fullWidth
                             onChange={this._onChange.bind(this)}
                             displayMember={this.props.displayMember}
                             menuItems={this.props.menuItems}/>
                <TextField value={this.state.id_selected}  name={this.props.name} style={{display: 'none'}}/>
            </div>
        )
    }
    _onChange (e, id, select) {
        this.setState({
            id_selected: select.id
        })
    }
}

export default ColHelper(Select);