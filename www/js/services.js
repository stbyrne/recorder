angular.module('recorder.services', [])

.factory('Sounds', function($q) {

	var deleteSound = function(x) {
		console.log("calling deleteSound");
		var deferred = $q.defer();
		getSounds().then(function(sounds) {
			sounds.splice(x,1);
			localStorage.recorder = JSON.stringify(sounds);
			deferred.resolve();
		});
	
		return deferred.promise;			
	
	}
	
	var getSounds = function() {
		var deferred = $q.defer();
		var sounds = [];
		
		if(localStorage.recorder) {
			sounds = JSON.parse(localStorage.recorder);
		}
		deferred.resolve(sounds);
	
		return deferred.promise;
	}
	
	var playSound = function(x) {
		getSounds().then(function(sounds) {
			var sound = sounds[x];

			/*
			Ok, so on Android, we just work.
			On iOS, we need to rewrite to ../Library/NoCloud/FILE'
			*/
			var mediaUrl = sound.file;
			if(device.platform.indexOf("iOS") >= 0) {
				/*mediaUrl = "../Library/NoCloud/" + mediaUrl.split("/").pop();*/
				/*mediaUrl = mediaUrl.replace('file://','');*/
                console.log("Recording is copied here: " + mediaUrl);
			}
			var media = new Media(mediaUrl, function(e) {
				media.release();
			}, function(err) {
				console.log("media err", err);
			});
			media.play();
            console.log("Playing recording from here: " + mediaUrl);
		});		
	}
	
	var saveSound = function(s) {
		console.log("calling saveSound");
		var deferred = $q.defer();
		getSounds().then(function(sounds) {
			sounds.push(s);
			localStorage.recorder = JSON.stringify(sounds);
			deferred.resolve();
		});
	
		return deferred.promise;			
	}

	return {
		get:getSounds,
		save:saveSound,
		delete:deleteSound,
		play:playSound
	};
});
