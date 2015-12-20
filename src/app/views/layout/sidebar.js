import Menu from 'material-ui/lib/menus/menu'
import DividerItem from 'material-ui/lib/divider'
import {Component, PropTypes} from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import List from 'material-ui/lib/lists/list'
import _has from 'lodash.has'
var MenuStyles    = {
    borderTop: "none",
    overflow : "hidden",
    position : "absolute",
    top      : "64px",
    width    : _has(window, 'config_dui.layout.sidebar.width') ? window.config_dui.layout.sidebar.width : "192px"
};

class SideBar extends Component {
    mappingItems (items = []) {
        var Items = [];

        items.forEach((item, index) => {
            if (_has(item, 'route') && _has(item, 'text')) {
                Items.push(
                    <ListItem key={index}
                              onTouchTap={this._onClickItem.bind(this, item)}
                              primaryText={item.text} nestedItems={_has(item, 'subroutes') ? this.mappingItems(item.subroutes) : []}/>
                );
            } else if (_has(item, 'divider')) {
                return Items.push(<DividerItem key={index}/>);
            }
        });

        return Items;
    }

    render () {
        return (
            <div style={MenuStyles}>
                <Menu width={MenuStyles.width}
                      autoWidth={false}
                      hideable={false}
                      active
                      zDepth={0}>
                    <List>
                    {this.mappingItems(this.props.items)}
                    </List>

                </Menu>
            </div>
        )
    }

    _onClickItem(item) {
        if (!_has(item, 'subroutes')) {
            this.context.history.pushState(null, item.route);
        }
    }
}
SideBar.propTypes = {
    items: PropTypes.array.isRequired
};

SideBar.contextTypes = {
    history: PropTypes.object
};

export default SideBar