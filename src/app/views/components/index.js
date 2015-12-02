const Button = React.createFactory(require('./button').default);
const Grid   = React.createFactory(require('./grid').default);
const Paper  = React.createFactory(require('./paper').default);
const Form   = React.createFactory(require('./form').default);
const Input  = React.createFactory(require('./form/input').default);
const Select = React.createFactory(require('./form/select').default);
const Date   = React.createFactory(require('./form/date').default);

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
            key            : count_components,
            zDepth         : props.zDepth,
            style          : props.style,
            childComponents: props.child_components || [],
            cols           : props.cols || 12
        })
    }

    form(props) {
        return Form({
            childComponents: props.child_components || [],
            key            : count_components,
            cols           : props.cols || 12
        });
    }

    input(props) {
        return Input({
            key                   : count_components,
            label                 : props.label,
            labelStyle            : props.label_style,
            defaultValue          : props.default_value,
            hintText              : props.hint_text,
            hintStyle             : props.hint_style,
            underlineDisabledStyle: props.underline_disabled_style,
            underlineStyle        : props.underline_style,
            value                 : props.value,
            underlineFocusStyle   : props.underline_focus_style,
            errorText             : props.error_text,
            errorStyle            : props.error_style,
            multiLine             : props.multi_line,
            disabled              : props.disabled,
            type                  : props.type,
            cols                  : props.cols || 12
        })
    }

    select(props) {
        return Select({
            key          : count_components,
            menuItems    : props.items,
            hintText     : props.hint_text,
            displayMember: props.display_member,
            valueMember  : props.value_member,
            label        : props.label,
            cols         : props.cols || 12
        })
    }

    date(props) {
        return Date({
            key: count_components,
            hintText: props.hint_text,
            locale: props.locale
        })
    }
}

Factory.createComponent = function (displayNameComponent:string, props:object) {
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
    return Factory.createComponent(component.component_type, component);
}