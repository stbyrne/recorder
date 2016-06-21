//Ini

var question = {
    'stimulus': 'Question_should_appear_here!'
};


var handleOpenURL = function (url) {

    var holder = url.split("="),
        strArray = holder[1].split("_"),
        le = strArray.length;

    if (le > 1) {
        tempQuestion = strArray.slice(0, le).join(" ");
        question.stimulus = tempQuestion;
    }

};


angular.module('recorder', ['ionic', 'recorder.controllers', 'recorder.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'templates/home.html'
        })
        .state('new', {
            url: '/new',
            controller: 'RecordCtrl',
            templateUrl: 'templates/new.html'
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});
