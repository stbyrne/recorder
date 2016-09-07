
angular.module('recorder', ['ionic', 'recorder.controllers', 'recorder.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
      cordova.addStickyDocumentEventHandler('handleOpenURL');
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

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
    
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

var question = 't loading...';

console.log(question);

var handleOpenURL = function(url) {

    console.log("App Launched Via Custom URL");

    var holder = url.split("="),
         strArray = holder[1].split("_"),
         le = strArray.length;

    console.log(strArray);

    if (le > 1) {
        tempQuestion = strArray.slice(0, le).join(" ");
        console.log("Temp: " + tempQuestion);
        /*window.localStorage.setItem('question', tempQuestion);
        console.log(window.localStorage.getItem('question'));*/
        question = tempQuestion;
        console.log(question);
    }
}



