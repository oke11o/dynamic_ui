import FactoryComponents from './../index'
import Connect from 'react-redux/lib/components/connect'


class Block extends React.Component {
    render () {
        return <div>{this.props.blocks.filter((block) => {
            return block.id === this.props.id
        }).map(component => {
            return FactoryComponents(component);
        })}</div>
    }
}

export default Connect(state => ({
    blocks: state.content.get('blocks')
}))(Block)