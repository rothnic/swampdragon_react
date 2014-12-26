/**
 * Created by rothnic on 12/25/14.
 */
//var TodoControllers = angular.module('TodoControllers', []);
//
//TodoControllers.controller('TodoListCtrl', ['$scope', '$dragon', function ($scope, $dragon) {
//    $scope.todoList = {};
//    $scope.todoItems = [];
//    $scope.channel = 'todos';
//
//    $dragon.onReady(function() {
//        $dragon.subscribe('todo-item', $scope.channel, {todo_list__id: 1}).then(function(response) {
//            $scope.dataMapper = new DataMapper(response.data);
//        });
//
//        $dragon.getSingle('todo-list', {id:1}).then(function(response) {
//            $scope.todoList = response.data;
//        });
//
//        $dragon.getList('todo-item', {list_id:1}).then(function(response) {
//            $scope.todoItems = response.data;
//        });
//    });
//
//    $dragon.onChannelMessage(function(channels, message) {
//        if (indexOf.call(channels, $scope.channel) > -1) {
//            $scope.$apply(function() {
//                $scope.dataMapper.mapData($scope.todoItems, message);
//            });
//        }
//    });
//
//    $scope.itemDone = function(item) {
//        item.done = true != item.done;
//        $dragon.update('todo-item', item);
//    }
//}]);


require(['React', 'dragon', 'datamapper'], function(React, dragon){


    var ServersComponent = React.createClass({

      getInitialState: function () {
        return {
          dataMapper: {},
          serverList: [],
          serverItems: []
        };
      },

      componentWillMount: function () {
        //$.get(this.props.url, function (data) {
        //  this.setState(data);
        //});


        dragon.onReady(function() {
          dragon.subscribe('server-item', 'servers', {server_list__id: 1}).then(function (response) {
            console.log(response);
            this.setState({dataMapper: new DataMapper(response)});
          }.bind(this));

          dragon.getSingle('server-list', {id: 1}).then(function (response) {
            console.log(response);
            //console.log(this);
            this.setState({serverList: response.data});
          }.bind(this));

          dragon.getList('server-item', {list_id: 1}).then(function (response) {
            console.log(response);
            //this.state.serverItems.push({serverItems: response.data[0]});
            //console.log(this);
            this.setState({serverItems: response.data});
          }.bind(this));

          dragon.onChannelMessage(function (channels, message) {
            console.log(message);
            if (channels.indexOf('servers') > -1) {
                this.state.dataMapper.mapData(this.state.serverItems, message);
            }
          }.bind(this));

        }.bind(this));

      },

      render: function () {
        console.log(this.state.serverItems);
        var items = this.state.serverItems.map(function(item) {
            return <div key={item.id}>{item.text}</div>;
        });
        return (
            <div>
              <div> Hello World! </div>
              <div> {items}</div>
            </div>
        );
      }
    });

  React.render(<ServersComponent />, document.getElementById('ServerApp'));

});