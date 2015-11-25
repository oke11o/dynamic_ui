import FactoryComponents from 'views/components/index'
import GridList from 'material-ui/lib/grid-list/grid-list'


import Mockup from 'mockups/index'


class DynamicPage extends React.Component {

    render() {
        return (
            <div className="mdl-grid">{
                    Mockup.map((component) => {
                        return FactoryComponents(component)
                    })
                }</div>

        )
    }
}

export default DynamicPage