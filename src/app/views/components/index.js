const Button = React.createFactory(require('./button').default);
const Grid   = React.createFactory(require('./grid').default);
const Paper  = React.createFactory(require('./paper').default);

var count_components = 0;

// TODO add basic_component with blackjack and...

class Factory {


    button(props) {
        // TODO validate data
        return Button({
            key      : count_components,
            label    : props.label,
            primary  : props.primary,
            secondary: props.secondary,
            floating : props.floating,
            raised   : props.raised,
            flat     : props.flat,
            mini     : props.mini,
            cols     : props.cols || 12,
            style    : props.style
        });
    }

    grid(props) {
        return Grid({
            key            : count_components,
            childComponents: props.child_components || [],
            cols           : props.cols || 12,
            cellHeight     : props.cellHeight,
            padding        : props.padding,
            style          : props.style
        })
    }

    paper(props) {
        return Paper({
            key: count_components,
            zDepth: props.zDepth,
            style : props.style,
            childComponents: props.child_components || [],
            cols: props.cols || 12
        })
    }
}

Factory.renderComponent = function (displayNameComponent:string, props:object) {
    var component;

    if (Factory.prototype[displayNameComponent] === undefined) {
        // TODO exeption
        throw new Error('unknown component');
    }

    component = new Factory.prototype[displayNameComponent](props);
    count_components++;

    // TODO error message;

    return component;

};

export default function (component) {
    return Factory.renderComponent(component.component_type, component);
}