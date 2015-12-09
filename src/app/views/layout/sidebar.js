import { Menu } from 'material-ui'
var MenuStyles    = {
    borderTop: "none",
    overflow : "hidden",
    position : "absolute",
    top      : "64px",
    width    : "192px"
};

class SideBar extends React.Component {
    render () {
        return (
            <div style={MenuStyles}>
                <Menu
                    menuItems={this.props.items}
                    autoWidth={true}
                    onItemTap={this._onClickItem.bind(this)}
                    hideable={false}
                    active
                    zDepth={0}>
                </Menu>
            </div>
        )
    }

    _onClickItem (e, selected_id, item) {
        this.context.history.pushState(null, item.route);
    }
}

SideBar.contextTypes = {
    history: React.PropTypes.object
};

export default SideBar