module.exports = {
    status: "success",
    data  : [
        {
            component_type: 'button',
            label         : "Default", // required
            flat          : true, // optional, default: raised
            icon_name     : 'done',
            href          : '/grids?asd=aasd&as=11',
            cols          : 6
        }, {
            component_type: 'button',
            label         : 'Primary', // required
            primary       : true, // optional, default: default
            cols          : "3"
        }, {
            component_type: 'button',
            label         : 'secondary', // required
            floating      : true,  // optional, default: raised
            mini          : true, // optional, default: true
            secondary     : true, // optional, default: default
            cols          : 6
        }, {
            component_type  : 'grid',
            cols            : 12, // optional, default: 12
            child_components: [{
                component_type: 'button',
                label         : "Default", // required
                flat          : true, // optional, default: raised
                cols          : 6
            }, {
                component_type: 'button',
                label         : "Default", // required
                flat          : true, // optional, default: raised
                cols          : 6
            }]
        }, {
            component_type  : 'paper',
            zDepth          : 2, //optional, default: 1,
            child_components: [
                {
                    component_type: 'button',
                    label         : 'Asd'
                }
            ]
        }, {
            component_type  : 'paper',
            child_components: [
                {
                    component_type: 'button',
                    label         : 'Asd'
                }
            ]
        }
    ]
};