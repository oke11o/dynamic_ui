import Paper from 'material-ui/lib/paper'
import FactoryComponents from './../index'
import ColHelper from './../helpers/col'

class ComponentPaper extends React.Component {
    render () {
        return <Paper style={this.props.style} zDepth={this.props.zDepth}>
            {this.props.childComponents.map((component) => {
                return FactoryComponents(component);
            })}
        </Paper>
    }
}

ComponentPaper.defaultProps = {
    zDepth: 1
};

if (_DEVELOPMENT_) {
    ComponentPaper.propTypes = {
        zDepth: React.PropTypes.number,
        childComponents: React.PropTypes.array,
        style: React.PropTypes.object
    }
}

export default ColHelper(ComponentPaper);