/**
 * Created by rothnic on 12/25/14.
 */

var DataMapper = require('../../comm/swampdragon-datamapper');
var VanillaDragon = require('../../comm/swampdragon-vanilla');

var React = require('react');

var ServersComponent = React.createClass({

    channel: 'servers',

    vanillaDragon: {},

    dataMapper: {},

    // React needs initial valid states
    getInitialState: function () {
        return {
            serverList: [],
            serverItems: []
        };
    },

    // Subscription function used to get initial data, and initialize DataMapper
    subscribe: function () {

        this.vanillaDragon.subscribe('server-item', this.channel, {server_list__id: 1},

            function (context, data) {
                console.log('got data');
                console.log(data);
                this.dataMapper = new DataMapper(data);
                this.getListOfServers();

            }.bind(this), function (context, data) {

                // Subscription failed
                console.log("Failed to subscribe");

            }.bind(this));
    },

    // A handler to apply newly received data to the existing component state
    onMessage: function (channels, message) {

        if (this.channel.indexOf(channels) > -1) {

            console.log('Applying the new data into the existing data.');

            // We must copy the array so that it can be mutated
            var tmpItems = this.state.serverItems.slice(0);

            // DataMapper does its thing on the copied array
            this.dataMapper.mapData(tmpItems, message);

            // Tell react to apply the changes to serverItems
            this.setState({serverItems: tmpItems});
        }
    },

    // Gets entire list of servers
    getListOfServers: function () {
        this.vanillaDragon.getList('server-item', {list_id: 1}, function (context, data) {

            // Handle the list of servers
            console.log('Received full list of servers:');
            console.log(data);
            this.setState({serverItems: data});
        }.bind(this));
    },

    // Function to handle anything we can only do after SwampDragon is initialized
    onOpen: function () {

        console.log('SwampDragon initialized on ReactJS component, setting up subscriptions.');
        this.subscribe();
    },

    // React calls this one time, right before the component mounts
    componentWillMount: function () {

        // Customize swampdragon with our settings/functions
        var swampdragon_options = {
            host: "http://localhost:9999",
            endpoint: "/data",
            onopen: this.onOpen,
            onchannelmessage: this.onMessage
        };

        // Initialize SwampDragon Call Handler
        this.vanillaDragon = VanillaDragon(swampdragon_options);

    },

    componentDidMount: function () {
        console.log('Did Mount');

    },

    // Called each time this.setState is called
    render: function () {

        // Log our current ServerItems
        console.log('Current ServerItems State:');
        console.log(this.state.serverItems);

        // Format the items into html for each item
        var items = this.state.serverItems.map(function (item) {
            return <div key={item.id}>Server {item.id}: {item.text}</div>;
        });

        // Return the components to render.
        return (
            <div>
                <div>
                    <b>Server Items</b>
                </div>
                <div>{items}</div>
            </div>
        );
    }
});

module.exports = ServersComponent;