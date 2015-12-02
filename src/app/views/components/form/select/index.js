import SelectField from 'material-ui/lib/select-field'
import ColHelper from './../../helpers/col'
class Select extends React.Component {
    render() {
        return (
            <SelectField style={this.props.style}
                         value={this.props.value}
                         hintText={this.props.hintText}
                         valueMember={this.props.valueMember}
                         floatingLabelText={this.props.label}
                         value={1}
                         displayMember={this.props.displayMember}
                         menuItems={this.props.menuItems}/>
        )
    }
}

export default ColHelper(Select);