module.exports = [
    {
        component_type  : 'grid',
        child_components: [
            {
                component_type: 'paper',
                child_components: [
                    {
                        component_type: 'grid',
                        cols: 12,
                        child_components: [
                            {
                                component_type: 'text',
                                tag           : 'h1',
                                text          : 'Heading 1',
                                style: {
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }
                            }, {
                                component_type: 'text',
                                tag           : 'h2',
                                text          : 'Heading 2',
                                style: {
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }
                            }, {
                                component_type: 'text',
                                tag           : 'h3',
                                text          : 'Heading 3',
                                style: {
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }
                            }, {
                                component_type: 'text',
                                tag           : 'h4',
                                text          : 'Heading 4',
                                style: {
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }
                            }, {
                                component_type: 'text',
                                tag           : 'h5',
                                text          : 'Heading 5',
                                style: {
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }
                            }, {
                                component_type: 'text',
                                tag           : 'h6',
                                text          : 'Heading 6',
                                style: {
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];