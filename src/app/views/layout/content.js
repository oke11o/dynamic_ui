var ContentStyles = {
    borderLeft: "solid 1px #e0e0e0",
    boxSizing : "border-box",
    marginLeft: "192px",
    minHeight : "800px",
    padding   : "24px 24px 24px 24px"
};

class Content extends React.Component {
    render () {
        return (
            <div style={ContentStyles}>
                {this.props.children}
            </div>
        )
    }
}

export default Content