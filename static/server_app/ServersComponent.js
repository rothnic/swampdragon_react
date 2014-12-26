/**
 * Created by rothnic on 12/25/14.
 */

require(['React', 'dragon', 'datamapper'], function (React, dragon) {

    var ServersComponent = React.createClass({

        // React needs initial valid states
        getInitialState: function () {
            return {
                dataMapper: {},
                serverList: [],
                serverItems: []
            };
        },

        // React calls this one time, right before the component mounts
        componentWillMount: function () {

            dragon.onReady(function () {
                dragon.subscribe('server-item', 'servers', {server_list__id: 1}).then(function (response) {
                    console.log('Subscription Response:');
                    console.log(response);
                    this.setState({dataMapper: new DataMapper(response)});
                }.bind(this));

                dragon.getSingle('server-list', {id: 1}).then(function (response) {
                    this.setState({serverList: response.data});
                }.bind(this));

                dragon.getList('server-item', {list_id: 1}).then(function (response) {
                    this.setState({serverItems: response.data});
                }.bind(this));

                dragon.onChannelMessage(function (channels, message) {
                    console.log('New Message:');
                    if (channels.indexOf('servers') > -1) {
                        this.state.dataMapper.mapData(this.state.serverItems, message);
                    }
                }.bind(this));

            }.bind(this));
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
                    <div><b>Server Items</b></div>
                    <div>{items}</div>
                </div>
            );
        }
    });

    React.render(<ServersComponent />, document.getElementById('ServerApp'));

});