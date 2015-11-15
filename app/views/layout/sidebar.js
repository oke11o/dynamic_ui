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
                    menuItems={[{route:'/asd', text: 'ss'}]}
                    autoWidth={true}
                    hideable={false}
                    zDepth={0}>
                </Menu>
            </div>
        )
    }
}

export default SideBar