import FactoryComponents from './../index'
import ContentActions from 'actions/content'
import Connect from 'react-redux/lib/components/connect'

var ref_block_id = 0;
class RefreshBlock extends React.Component {

    constructor() {
        super();

        this.state = {
            id_interval: null
        };
    }

    componentDidMount() {
        var interval = this.props.interval || 10;

        this.state.id_interval = setInterval(() => {
            this.props.dispatch(ContentActions.refresh_req(this.props.to, ref_block_id));
        }, this.props.interval * 1000);

        ref_block_id++;
    }

    componentWillUnmount () {
        clearInterval(this.state.id_interval);
    }

    render () {
        return <div>{this.props.blocks.filter((block) => {
            return block.id === this.props.id
        }).map(component => {
            return FactoryComponents(component);
        })}</div>
    }
}


export default Connect(state => ({
    blocks: state.content.get('refresh_blocks')
}))(RefreshBlock)