# Sidebar

menu in the sidebar is constructed with respect to a response from the api - / get-menu


### The response from the api /get-menu
~~~json
[
    {
        route: '/ad',
        text: 'Unicorn'
    }, {
        route: '/da',
        text: 'Pony'
    }, {
        divider: true
    }, {
        route: '/asd',
        text: 'Taddy'
    }, {
        divider: true
    }, {
        route: '/asd',
        text: 'Marry',
        subroutes: [
            {
                route: '/hope',
                text: 'Hope'
            }
        ]
    }
]
~~~

