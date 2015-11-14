import React from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component {
    static propTypes = {
        asd: React.PropTypes.string
    };
    render () {
        return (
            <div>asdss</div>
        )
    }
}


ReactDOM.render(<Test/>, document.getElementById('app'));