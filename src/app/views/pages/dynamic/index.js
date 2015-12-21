import _has from 'lodash.has'
import Connect from 'react-redux/lib/components/connect'
import GridList from 'material-ui/lib/grid-list/grid-list'

import FactoryComponents from 'views/components/index'

import ContentActions from 'actions/content'
import RequestActions from 'actions/request'


class DynamicPage extends React.Component {
    componentWillMount () {

    }
    componentWillReceiveProps (nextProps) {
        if (this.props.menu.length !== nextProps.menu.length && this.props.menu.every((element, index) => {
                return element !== nextProps.menu[index]
            })) {
            var searched = false;
            for (var i = nextProps.menu.length - 1; i >= 0; i--) {
                if (_has(nextProps.menu[i], 'route') && this.context.history.isActive(nextProps.menu[i].route, {}, true)) {
                    this.props.dispatch(ContentActions.fetch_content(nextProps.location));
                    searched = true;
                    break;
                }
            }

            if (!searched) {

                // TODO check first element have property route
                this.props.dispatch(ContentActions.fetch_content({pathname: nextProps.menu[0].route}));
            }

        } else if (this.props.location !== nextProps.location) {
            this.props.dispatch(RequestActions.abortRequests('content'));
            this.props.dispatch(ContentActions.fetch_content(nextProps.location));
        }
    }
    render() {
        return (
            <div >{
                    this.props.content.map((component) => {
                        return FactoryComponents(component)
                    })
                }</div>

        )
    }
}
DynamicPage.contextTypes = {
    history: React.PropTypes.object
};

export default Connect(state => ({
    content: state.content.get('components'),
    menu: state.menu.get('items'),
    requests: state.request.get('requests')
}))(DynamicPage)