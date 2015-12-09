import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableFooter from 'material-ui/lib/table/table-footer'
import TableHeader from 'material-ui/lib/table/table-header'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import FactoryComponents from './../index'


class TableComponent extends React.Component {
    render() {
        return (
            <Table >
                <TableHeader adjustForCheckbox={false}
                             displaySelectAll={false}
                             enableSelectAll={false} selectAllSelected={false}>
                    <TableRow>
                        {this.props.head.map((item, index) => {
                            return <TableHeaderColumn key={index} tooltip={item.tooltip}>{item.text}</TableHeaderColumn>
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.data.map((row, index) => {
                        return <TableRow displayBorder={false} key={index}>
                            {row.map((item, index) => {
                                return <TableRowColumn key={index}>{FactoryComponents(item)}</TableRowColumn>
                            })}
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        )
    }
}

export default TableComponent