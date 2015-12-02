import DatePicker from 'material-ui/lib/date-picker/date-picker'


class Date extends React.Component {
    render () {
        return (
            <DatePicker hintText={this.props.hintText} DateTimeFormat={Intl.DateTimeFormat} locale={this.props.locale}/>
        )
    }
}


export default Date