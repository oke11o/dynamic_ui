const Checkbox         = React.createFactory(require('material-ui/lib/checkbox'));
const RadioButton      = React.createFactory(require('material-ui/lib/radio-button'));
const RadioButtonGroup = React.createFactory(require('material-ui/lib/radio-button-group'));
const Toggle           = React.createFactory(require('material-ui/lib/toggle'))
const Button           = React.createFactory(require('./button').default);
const Grid             = React.createFactory(require('./grid').default);
const Paper          = React.createFactory(require('./paper').default);
const Form           = React.createFactory(require('./form').default);
const Input          = React.createFactory(require('./form/input').default);
const Select         = React.createFactory(require('./form/select').default);
const Date           = React.createFactory(require('./form/date').default);
const Table          = React.createFactory(require('./table').default);
const FileInput      = React.createFactory(require('./form/file_input').default);
const Block          = React.createFactory(require('./block/index.js').default);
const RefreshBlock   = React.createFactory(require('./refresh_block').default);
var count_components = 0;

// TODO add basic_component with blackjack and...

class Factory {


    button(props) {
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
            style    : props.style,
            iconName : props.icon_name,
            iconStyle: props.icon_style,
            href     : props.href,
            type     : props.type || ''
        });
    }

    grid(props) {
        return Grid({
            key            : count_components,
            childComponents: props.child_components || [],
            cols           : props.cols,
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
            childComponents : props.child_components || [],
            key             : count_components,
            cols            : props.cols || 12,
            to              : props.to,
            method          : props.method,
            redirect_to     : props.redirect_to,
            destination     : props.destination,
            crearAfterSubmit: props.clear_after_submit
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
            cols                  : props.cols || 12,
            name                  : props.name
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

    text(props) {
        return React.createElement(props.tag || 'span', {
            key  : count_components,
            style: props.style
        }, props.text);
    }

    checkbox(props) {
        return Checkbox({
            name          : props.name,
            value         : props.value,
            label         : props.label,
            defaultChecked: props.default_checked || false,
            disabled      : props.disabled || false,
            style         : props.style,
            labelPosition : props.label_position,
            labelStyle    : props.label_style,
            key           : count_components
        })
    }

    radio_button_group(props) {
        return RadioButtonGroup({
            name           : props.name,
            defaultSelected: props.default_selected,
            labelPosition  : props.label_position,
            style          : props.style,
            key            : count_components,
            children       : props.child_components ? props.child_components.map(component => Factory.createComponent(component.component_type, component)) : []
        })
    }

    radio_button(props) {
        return RadioButton({
            key  : count_components,
            label: props.label,
            value: props.value
        })
    }

    table(props) {
        return Table({
            key : count_components,
            head: props.head,
            data: props.data
        })
    }


    file_input(props) {
        return FileInput({
            key: count_components,
            cols: props.cols || 12
        })
    }

    block(props) {
        return Block({
            key: count_components,
            id : props.id
        })
    }

    refresh_block(props) {
        return RefreshBlock({
            key: count_components,
            to : props.to,
            interval: props.interval,
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
    if (typeof component.component_type !== 'undefined') {
        return Factory.createComponent(component.component_type, component);
    }
    return [];
}