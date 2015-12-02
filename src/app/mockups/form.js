export default [
    {
        component_type  : 'form',
        child_components: [
            {
                component_type: 'input',
                label         : 'asdas',
                default_value : 'asd',
                cols          : 4
            }, {
                component_type: 'select',
                value_member  : "id",
                label         : 'asd',
                cols          : 3,
                items         : [
                    {
                        id     : 1,
                        payload: 1,
                        name   : 'asd',
                        text   : 'Never'
                    }, {
                        id     : 2,
                        payload: 2,
                        name   : 'asd',
                        text   : 'Nesver'
                    }
                ]
            }, {
                component_type: 'date',
                hint_text: 'adsasd',
                locale: 'ru'
            }
        ]
    }
]