var app = angular.module("myApp",[]);

app.config(["$httpProvider", function ( $httpProvider) {        
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);