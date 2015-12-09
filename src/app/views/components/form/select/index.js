import SelectField from 'material-ui/lib/select-field'
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
            <SelectField style={this.props.style}
                         value={this.props.value}
                         hintText={this.props.hintText}
                         valueMember={this.props.valueMember}
                         floatingLabelText={this.props.label}
                         value={this.state.id_selected}
                         onChange={this._onChange.bind(this)}
                         displayMember={this.props.displayMember}
                         menuItems={this.props.menuItems}/>
        )
    }
    _onChange (e, id, select) {
        this.setState({
            id_selected: select.id
        })
    }
}

export default ColHelper(Select);