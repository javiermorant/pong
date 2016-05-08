var PongController = function(params) {
	var playerLeft, playerRight, context;
	playerLeft = params.playerLeft;
	playerRight = params.playerRight;
	ball = params.ball;
	context = params.context;
	var update = function() {
		playerLeft.update();
		playerRight.update();
		ball.update(playerLeft, playerRight);
		ballCollisions(playerLeft, playerRight, ball);
	};
	var render = function() {
		context.fillStyle = BACKGROUND;
		context.fillRect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = "#FFFFFF";
		context.fillRect(WIDTH / 2, 0, 1, HEIGHT);
		playerLeft.render();
		playerRight.render();
		ball.render();
	};
	var step = function() {
		update();
		render();
		animate(step);
	};
	function getY(y, paddleTopBound, sector) {
		if (paddleTopBound - sector < y && y <= paddleTopBound) {
			return 2;
		} else if (paddleTopBound - 2 * sector < y
				&& y <= paddleTopBound - sector) {
			return 1;
		} else if (y == paddleTopBound - 2 * sector) {
			return 0;
		} else if (paddleTopBound - 3 * sector < y
				&& y < paddleTopBound - 2 * sector) {
			return -1;
		} else {
			return -2;
		}
	}
	function ballCollisions(paddleLeft, paddleRight, ball) {
		var topx = ball.getX() + ball.getRadius();
		var topy = ball.getY() + ball.getRadius();
		var bottomx = ball.getX() - ball.getRadius();
		var bottomy = ball.getY() - ball.getRadius();
		// velocity vector will be updated on events(score, hit the wall, hit by
		// the paddle)
		if (ball.getX() < 0 || ball.getX() > WIDTH) { // player2 scores
			// start again
			if (ball.getX() > WIDTH) {
				ball.setVX(3);
			} else {
				ball.setVX(-3);
			}
			ball.setX(WIDTH / 2);
			ball.setY(HEIGHT / 2);
			ball.setVY(0);
		}
		if (ball.getY() < 0) { // HIT top wall
			ball.setVY(-ball.getVY());
		}
		if (ball.getY() > HEIGHT) {// HIT Bottom wall
			ball.setVY(-ball.getVY());
		}
		var tol = 5;
		if (ball.getVX() < 0 && ball.getX() < WIDTH / 2) {
			// only playerLeft can Hit the ball
			if (bottomy + tol > paddleLeft.y
					&& topy - tol < paddleLeft.y + paddleLeft.height
					&& bottomx - tol < paddleLeft.x + paddleLeft.width
					&& paddleLeft.x + paddleLeft.width - tol < topx) {
				ball.setVX(-ball.getVX() + 1);
				if (ball.getVX() > 5) {
					ball.setVX(5);
				}
				var paddleTopBound = paddleLeft.y + paddleLeft.height;
				var paddleBottomBound = paddleLeft.y;
				var sector = paddleLeft.height / 4;
				ball.setVY(getY(ball.getY(), paddleTopBound, sector));
			}
		}
		if (ball.getVX() > 0 && ball.getX() > WIDTH / 2) {
			// only playerLeft can Hit the ball
			if (bottomy + tol > paddleRight.y
					&& topy - tol < paddleRight.y + paddleRight.height
					&& paddleRight.x - tol < topx
					&& paddleRight.x + tol > bottomx) {
				ball.setVX(-ball.getVX() - 1);
				if (ball.getVX() < -5) {
					ball.setVX(-5);
				}
				var paddleTopBound = paddleRight.y + paddleRight.height;
				var paddleBottomBound = paddleRight.y;
				var sector = paddleRight.height / 4;
				ball.setVY(getY(ball.getY(), paddleTopBound, sector));
			}
		}
	}
	return {
		animate : animate,
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
