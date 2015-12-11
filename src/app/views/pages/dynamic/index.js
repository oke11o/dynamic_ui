import FactoryComponents from 'views/components/index'
import GridList from 'material-ui/lib/grid-list/grid-list'
import ContentActions from 'actions/content'

import Mockup from 'mockups/index'


class DynamicPage extends React.Component {
    componentWillMount () {

    }
    componentWillReceiveProps (nextProps) {
        if (this.props.location !== nextProps.location) {
            this.props.dispatch(ContentActions.fetch_content(nextProps.location));
        }
        if (this.props.menu.length !== nextProps.menu.length && this.props.menu.every((element, index) => {
                return element !== nextProps.menu[index]
            })) {
            var searched = false;
            for (var i = nextProps.menu.length - 1; i >= 0; i--) {
                if (this.context.history.isActive(nextProps.menu[i].route, {}, true)) {
                    this.props.dispatch(ContentActions.fetch_content(nextProps.location));
                    searched = true;
                    break;
                }
            }

            if (!searched) {
                this.props.dispatch(ContentActions.fetch_content(nextProps.location));
            }
        }
    }
    render() {
        console.log(this.props);
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
    menu: state.menu.get('items').toJS()
}))(DynamicPage)