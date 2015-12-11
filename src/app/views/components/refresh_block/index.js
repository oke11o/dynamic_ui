import FactoryComponents from './../index'


class RefreshBlock extends React.Component {
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