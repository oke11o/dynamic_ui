import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import FactoryComponents from './../index'

class Grid extends React.Component {
    render() {
        var classColGrid;

        if (this.props.cols) {
            classColGrid = classNames("mdl-cell", {
                ["mdl-cell--" + this.props.cols + "-col"]: this.props.cols
            });
        } else {
            classColGrid = classNames("mdl-grid");
        }
        return (
            <div style={this.props.style} className={classColGrid}>
                {this.props.childComponents.map((component) => {
                    return FactoryComponents(component);
                })}
            </div>
        )

    }
}
if (_DEVELOPMENT_) {
    Grid.propTypes = {
        cols           : React.PropTypes.number,
        cellHeight     : React.PropTypes.number,
        padding        : React.PropTypes.number,
        childComponents: React.PropTypes.array,
        style          : React.PropTypes.object
    }
}

export default Grid