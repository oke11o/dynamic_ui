module.exports = {
    status: "success",
    data  : [
    {
        component_type: 'grid',
        child_components: [
            {
                component_type: 'paper',
                child_components: [
                    {
                        component_type: 'table',
                        head          : [{
                            text: 'id',
                            tooltip: 'id entity'
                        }, {
                            text: 'name',
                            tooltip: 'Name subject'
                        }],
                        data          : [
                            [
                                {
                                    component_type: 'text',
                                    text          : '0'
                                }, {
                                component_type: 'text',
                                text          : 'Unicorn Petrovich'
                            }
                            ], [
                                {
                                    component_type: 'text',
                                    text          : '1'
                                }, {
                                    component_type: 'text',
                                    text          : 'Cat Bobby'
                                }
                            ]
                        ]
                    }
                ]
            }
        ]
    }
    ]
};