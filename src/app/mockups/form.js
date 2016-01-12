module.exports = {
    status: "success",
    data  : [
        {
            component_type  : 'form',
            child_components: [
                {
                    component_type          : 'input',
                    label                   : 'text',
                    label_style             : {
                        color   : 'red',
                        fontSize: '14px'
                    },
                    hint_text               : 'asda',
                    hint_style              : {
                        fontSize: '12px'
                    },
                    underline_disabled_style: {
                        borderSize: '100px'
                    },
                    underline_style         : {
                        borderSize: '1px'
                    },
                    value                   : 'text value',
                    underline_focus_style   : {
                        color: 'red'
                    },
                    error_text              : 'asd',
                    multi_line              : true,
                    disabled                : false,
                    default_value           : 'asd',
                    cols                    : 4
                }, {
                    component_type: 'date',
                    hint_text     : 'adsasd',
                    locale        : 'ru'
                }
            ]
        }
    ]
};