import ColHelper from './../helpers/col'
import FactoryComponents from './../index'

class Form extends React.Component {
    render () {
        return (
            <form>
                {this.props.childComponents.map((component) => {
                    return FactoryComponents(component);
                })}
            </form>
        )
    }
}

if (_DEVELOPMENT_) {
    Form.propTypes = {

    };
}

export default ColHelper(Form)