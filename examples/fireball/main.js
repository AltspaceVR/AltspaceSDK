(function(){
	document.addEventListener('DOMContentLoaded', function(){
		var TimeLimit = 60;
		var countdownInterval;
		var clockTime = TimeLimit;

		var basket = document.querySelector('#basket-container');
		var scoreText = document.querySelector('#score-text');
		var highscoreScoreText = document.querySelector('#highscore-score-text');
		var highscoreNameText = document.querySelector('#highscore-name-text');
		var clockText = document.querySelector('#clock-text');
		var scoreEffect0 = document.querySelector('#score-effect0');
		var scoreEffect1 = document.querySelector('#score-effect1');

		window.game = {
			basket: basket,
			scoreText: scoreText,
			clockText: clockText,
			highscoreScoreText: highscoreScoreText,
			highscoreNameText: highscoreNameText,
			scoreEffect0: scoreEffect0,
			scoreEffect1: scoreEffect1,
		};

		altspace.getUser().then(function(user){
			game.username = user.displayName;
		});

		basket.addEventListener('container-count-changed', function(event){
			if(event.detail.count > event.detail.oldCount && event.detail.count > 0){
				console.log('score changing from ' + event.detail.oldCount + ' to ' + event.detail.count);
				scoreGoal();
			}
		});

		function initHighscore(){
			var scene = document.querySelector('a-scene');
			setTimeout(function(){
				var syncSys = scene.systems['sync-system'];
				runAfterConnected(syncSys, function(){
					var highscoreRef = syncSys.connection.app.child('highscore');
					window.game.highscoreRef = highscoreRef;
					refreshHighscoreboard();
				});
			}, 500);
		}

		function refreshHighscoreboard(){
			game.highscoreRef.once('value', function(data){
				var val = data.val();
				console.dir('refreshed highscoreboard to: ');
				console.dir(val);
				window.game.highscoreScoreText.setAttribute('n-text', 'text:' + val.score);
				window.game.highscoreNameText.setAttribute('n-text', 'text:' + val.name);
			});
		}

		function refreshScoreboard(){
			game.scoreText.setAttribute('n-text', 'text:' + game.score);
		}

		function refreshClock(){
			game.clockText.setAttribute('n-text', 'text:' + clockTime);
		}

		function scoreGoal(){
			game.score++;
			game.scoreEffect0.emit('score');
			game.scoreEffect1.emit('score');
			refreshScoreboard();
		}

		function newGame(){
			game.score = 0;
			refreshScoreboard();
			newCountdown();
		}

		function newCountdown(){
			clockTime = TimeLimit;
			countdownInterval = setInterval(function(){
				clockTime--;

				if(clockTime < 0){
					endGame();
				}

				refreshClock();
			}, 1000);
		}

		function endGame(){

			clockTime = 0;
			clearInterval(countdownInterval)
			setTimeout(function(){
				newGame();
			}, 5000);

			function scoreHighscore(){//right now everyone in the space is going to do this at the same time
				console.log('scoring highscore' + game.score);
				game.highscoreRef.set({
					score: this.game.score,
					name: game.username//race condition
				})
				refreshHighscoreboard();
			}


			game.highscoreRef.once('value', function(data){
				var val = data.val();

				console.dir('checking highscore: ');
				console.dir(val);

				if(!val || !val.score){
					scoreHighscore();
				}

				if(val.score <= game.score){
					scoreHighscore();
				}
			});
		}

		function runAfterConnected(syncSys, callback){
			if(syncSys.connection){
				callback();
			} else {
				syncSys.sceneEl.addEventListener('connected', function(){
					callback();
				});
			}
		}

		//main

		initHighscore();
		newGame();
	});
})();