import TestUtils from 'react-addons-test-utils'
import React from 'react'
import ReactDOM from 'react-dom'
import chai from 'chai'
import SidebarComponent from './../../app/views/layout/sidebar.js'
import ListItem from 'material-ui/lib/lists/list-item'
import List from 'material-ui/lib/lists/list'
import DividerMenuItem from 'material-ui/lib/divider'
describe('Layout', () => {
    describe('Sidebar', () => {
        let jsonSimple = [
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
        ];
        let instance;


        beforeEach(() => {
            instance = TestUtils.renderIntoDocument(<SidebarComponent items={jsonSimple}/>);
        });



        it('Width sidebar is 200px', () => {
           chai.expect(ReactDOM.findDOMNode(instance).style.width).to.be.equal('200px')
        });


        it('There is two divider', () => {
            chai.expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'hr').length).to.be.equal(2);
        });

        it('There is five listItems', () => {
            chai.expect(TestUtils.scryRenderedComponentsWithType(instance, ListItem).length).to.be.equal(5);
        })


    })
});

