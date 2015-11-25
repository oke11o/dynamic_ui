import FactoryComponents from 'views/components/index'
import MockupButtons from 'mockups/button'
import GridList from 'material-ui/lib/grid-list/grid-list'

class DynamicPage extends React.Component {

    render() {
        return (
            <div className="mdl-grid">{
                    MockupButtons.map((component) => {
                        return FactoryComponents(component)
                    })
                }</div>

        )
    }
}

export default DynamicPage