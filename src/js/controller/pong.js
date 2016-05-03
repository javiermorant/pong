var PongController = function(params) {
	var playerLeft,playerRight, context;
	playerLeft = params.playerLeft;
	playerRight=params.playerRight;
	ball=params.ball;
	context=params.context;
	var update = function() {
		playerLeft.update();
		playerRight.update();
		ball.update(playerLeft, playerRight);
	};

	var render = function() {
		context.fillStyle = BACKGROUND;
		context.fillRect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = "#FFFFFF";
		context.fillRect(WIDTH/2, 0, 1, HEIGHT);
		playerLeft.render();
		playerRight.render();
		ball.render();
	};
	var step = function() {
		update();
		render();
		animate(step);
	};

	return {
		animate: animate,
		step : step
	}
}

var keysDown = {};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});
