angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $http) {
    var options = { frequency: 1000 };  // Update every 3 seconds
    var x1,y1,z1,x2=0,y2=0,z2=0;
    $scope.counted_steps = 0;
    if (localStorage.countedSteps !== undefined) {
      $scope.counted_steps = parseInt(localStorage.countedSteps);
    }
    document.addEventListener("deviceready", function() {
      navigator.accelerometer.watchAcceleration(onSuccess, onError1, options);
    }, false);
    function onSuccess(acceleration) {
      x1 = acceleration.x;
      y1 = acceleration.y;
      z1 = acceleration.z;
      if(Math.abs(x1-x2)>5 || Math.abs(y1-y2)>5 || Math.abs(z1-z2)>5) {
        $scope.counted_steps+=1;
        localStorage.countedSteps = $scope.counted_steps;
        $timeout(function () {
          $scope.$apply();
        }, 500);
      }
      //alert(x1 + ' ' +x2 + ' ' +y1 + ' ' +y2 + ' ' +z1 + ' ' +z2 + ' ' +steps);
      x2=x1;
      y2=y1;
      z2=z1;
    };
    function onError1() {
      alert('onError!');
    };

    document.addEventListener("online", onOnline, false);

    function onOnline () {
      var data = {
        stepCount: $scope.counted_steps,
        id: 'test'
      };
      sendData (data, function (err) {
        alert(err);
      });
    }

    function sendData (jsonData, cb) {
      $http({
        url: 'request-url',
        method: "POST",
      })
      .then(function(response) {
          cb(false);
      }, 
      function(response) { // optional
          cb(true);
      });
    }
});
