var handleOpenURL = function(url) {

    console.log("App Launched Via Custom URL");

    var holder = url.split("="),
         strArray = holder[1].split("_"),
         le = strArray.length;

    console.log(strArray);

    if (le > 1) {
        tempQuestion = strArray.slice(0, le).join(" ");
        window.localStorage['question'] = tempQuestion;
        console.log("Local Storage: " + window.localStorage['question']);
    }
}


angular.module('recorder', ['ionic', 'recorder.controllers', 'recorder.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: '/home',
    controller: 'HomeCtrl',
    templateUrl: 'templates/home.html'
  })
	.state('new', {
		url:'/new',
		controller: 'RecordCtrl',
		templateUrl: 'templates/new.html'
	});


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
