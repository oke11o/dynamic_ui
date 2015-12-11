import ColHelper from './../helpers/col'
import FactoryComponents from './../index'
import getFormData from 'get-form-data'
import ContentActions from 'actions/content'

class Form extends React.Component {
    render () {
        return (
            <form encType="multipart/form-data" onSubmit={this._onSubmit.bind(this)}>
                {this.props.childComponents.map((component) => {
                    return FactoryComponents(component);
                })}
            </form>
        )
    }

    _onSubmit(e) {
        e.preventDefault();
        const DATA   = getFormData(e.target);
        var formData = new FormData();

        for (let key in DATA) {
            if (DATA.hasOwnProperty(key)) {
                formData.append(key, DATA[key]);
            }
        }

        if (this.props.destination) {
            this.props.dispatch(ContentActions.push_data({
                data       : formData,
                key        : this.props.key,
                to         : this.props.to,
                destination: this.props.destination
            }));
        } else {
            // TODO validation props.to
            this.context.history.replaceState({
                method: this.props.method === 'POST' ? 'POST' : 'GET',
                data: this.props.method === 'POST' ? formData : DATA
            }, this.props.to, this.props.method === 'POST' ? formData : DATA);
        }
    }
}

Form.contextTypes = {
    history: React.PropTypes.object
};

if (_DEVELOPMENT_) {
    Form.propTypes = {

    };
}

export default Connect()(ColHelper(Form));