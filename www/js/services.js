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
})
.factory('Display', function(){

	var audioContext = new AudioContext();

	function drawBuffer( width, height, context, buffer ) {
	    var data = buffer.getChannelData( 0 );
	    var step = Math.ceil( data.length / width );
	    var amp = height / 2;
	    for(var i=0; i < width; i++){
	        var min = 1.0;
	        var max = -1.0;
	        for (var j=0; j<step; j++) {
	            var datum = data[(i*step)+j]; 
	            if (datum < min)
	                min = datum;
	            if (datum > max)
	                max = datum;
	        }
	        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
	    }
	}

	function initAudio() {

	    var audioRequest = new XMLHttpRequest();
	    audioRequest.open("GET", "sounds/test.wav", true);
	    audioRequest.responseType = "arraybuffer";
	    audioRequest.onload = function() {
	        audioContext.decodeAudioData( audioRequest.response, 
	            function(buffer) { 
	                var canvas = document.getElementById("view1");
	                drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffer ); 
	            } );
	    }
	    audioRequest.send();
	    return audioRequest;
	}

	/*window.addEventListener('load', initAudio );*/


})
/*.factory('Question', function(){
         
        
    
    
})*/;
