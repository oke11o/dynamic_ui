var Col = ComposedComponent => class extends React.Component {

    render () {
        var classColGrid = classNames("mdl-cell", {
            ["mdl-cell--" + this.props.cols + "-col"]: this.props.cols
        });
        return <div className={classColGrid}>
            <ComposedComponent {...this.props} />
        </div>
    }
};

if (_DEVELOPMENT_) {
    Col.propTypes = {
        cols: React.PropTypes.number
    }
}

export default Col