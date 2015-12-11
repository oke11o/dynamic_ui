module.exports = [
    {
        component_type: 'text',
        tag: 'h1',
        text: 'Form'
    },
    {
        component_type: 'grid',
        child_components: [
            {
                component_type: 'grid',
                cols: 6,
                child_components: [
                    {
                        component_type: 'input',
                        hint_text: 'Hint Text'
                    }, {
                        component_type: 'input',
                        hint_text: 'Styled Hint Text',
                        hint_style: {
                            color: 'red'
                        }
                    }, {
                        component_type: 'input',
                        hint_text: 'Hint Text',
                        default_value: 'Default Value'
                    }
                ]
            },
            {
                component_type: 'grid',
                cols: 6,
                child_components: [
                    {
                        component_type: 'checkbox',
                        name: 'checkboxName',
                        value: 'checkboxName',
                        label: 'went for a run today'
                    }, {
                        component_type: 'radio_button_group',
                        name: 'ads',
                        child_components: [
                            {
                                component_type: 'radio_button',
                                label: 'radio_button 1',
                                value: 'asd'
                            }, {
                                component_type: 'radio_button',
                                label: 'radio_button 2',
                                value: 'as2d'
                            }
                        ]
                    }
                ]
            }, {
                component_type: 'grid',
                cols: 6,
                child_components: [
                    {
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
                    }
                ]
            }
        ]
    }, {
        component_type: 'form',
        to: '/input/upload',
        destination: 'ttt',
        child_components: [
            {
                component_type: 'paper',
                style: {
                    width: '100%',
                    display: 'inline-block'
                },
                child_components: [
                    {
                        component_type: 'grid',
                        child_components: [
                            {
                                component_type: 'input',
                                hint_text: 'Hint Text',
                                cols: 6,
                                name: 'input-1'
                            }, {
                                component_type: 'file_input',
                                hint_text: 'file upload',
                                cols: 6,
                                name: 'file'
                            },{
                                component_type: 'button',
                                type: 'submit',
                                label: 'Submit',
                                style: {
                                    float: 'right',
                                    marginBottom: '10px'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }, {
        component_type: 'block',
        id: 'ttt',
        child_component: []
    }
];