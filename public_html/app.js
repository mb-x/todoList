'use strict';
var app = angular.module('todoapp', []);

app.controller("TodoCtrl", function ($scope, filterFilter, $location){
    $scope.placeholder = 'New Task';
    $scope.statusFilter = {};
    
    $scope.todos = [
        {
            name : 'copmleted task',
            completed : true
        },
        {
            name : 'not completed task',
            completed: false
        }
    ];
    
    $scope.$watch('todos', function (){
        $scope.remaining = filterFilter($scope.todos, {completed: false}).length;
        $scope.allchecked = !$scope.remaining;
    }, true);
    $scope.removeTodo = function (index){
        $scope.todos.splice(index, 1);
    };
    
    $scope.addTodo = function (){
      $scope.todos.push({
          name: $scope.newtodo,
          completed: false
      });  
      $scope.newtodo = '';
    };
    
    $scope.checkAllTodo = function (allchecked){
        $scope.todos.forEach(function (todo){
           todo.completed = allchecked; 
        });
    };
    
    $scope.editTodo = function (todo){
        todo.editing = false;
    };
    
    if($location.path() == ''){ $location.path('/'); }
    $scope.location = $location;
    $scope.$watch('location.path()', function (path){
        $scope.statusFilter = 
                (path == '/done') ? { completed: true } :
                (path == '/notdone') ? { completed: false } : 
                {} ;
    });
    
});