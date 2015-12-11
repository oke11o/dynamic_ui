module.exports = [
    {
        component_type  : 'grid',
        child_components: [
            {
                component_type  : 'form',
                to: '/search_result',
                redirect_to:'/refresh_block',
                child_components: [
                    {
                        component_type  : 'paper',
                        child_components: [
                            {
                                component_type  : 'grid',
                                child_components: [
                                    {
                                        component_type: 'input',
                                        label         : 'THIS IS SEARCH INPUT, BLYAT',
                                        cols          : 10
                                    }, {
                                        component_type: 'button',
                                        label         : 'Search',
                                        primary       : true,
                                        cols          : 2,
                                        style         : {
                                            marginTop: '19px'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, {
                id: 'search_result',
                component_type: 'block',
                child_component: []
            }
        ]
    }
];