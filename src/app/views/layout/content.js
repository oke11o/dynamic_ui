import CircularProgress from 'material-ui/lib/circular-progress'
import {spring, Motion, presets} from 'react-motion'
var ContentStyles = {
    borderLeft: "solid 1px #e0e0e0",
    boxSizing : "border-box",
    marginLeft: "192px",
    minHeight : "800px",
    padding   : "24px 24px 24px 24px"
};

class Loader extends React.Component {

    getStyles () {
        return {
            opacity: spring(1)
        }
    }

    willEnter () {
        return {
            opacity: spring(0)
        }
    }

    willLeave () {
        return {
            opacity: spring(0)
        }
    }

    render () {
        return (
            <Motion style={{opacity: spring(this.props.loading ? 1 : 0, [1000, 80])}}>
                {(x) => {
                    var styles_progress = {
                        opacity: x.opacity,
                        position:'absolute',
                        top: '45%',
                        left: '50%'
                    };
                    return <div>
                        {Math.floor(x.opacity) === 0 ? null : <CircularProgress  mode="indeterminate" size={1.5}  style={styles_progress}/>}
                    </div>
                }}
            </Motion>
        )
    }
}

class Content extends React.Component {
    render () {
        return (
            <div style={ContentStyles}>
                <Loader loading={this.props.page_loading}/>
                <Motion style={{opacity: spring(this.props.page_loading ? 0 : 1, [1000, 80])}}>
                    {(x) => {
                        return <div style={x}>{this.props.children}</div>
                    }}
                </Motion>
            </div>
        )
    }
}

export default Connect(state => ({
    page_loading: state.content.get('page_loading')
}))(Content);