var Ball = function(params) {
	var x, y, vx, vy, radius, context, color;
	x = params.x;
	y = params.y;
	vx = params.vx;
	vy = params.vy;
	radius = params.radius;
	context = params.context;
	color = params.color;

	var render = function() {
		context.beginPath();
		context.arc(x, y, radius, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
	}

	var update = function(paddleLeft, paddleRight) {
		x = x + vx;
		y = y + vy;
		var topx = x + radius;
		var topy = y + radius;
		var bottomx = x - radius;
		var bottomy = y - radius;
		// velocity vector will be updated on events(score, hit the wall, hit by
		// the paddle)
		if (x < 0) { // player2 scores
			//start again
			x= WIDTH / 2;
			y = HEIGHT / 2;
			vx = -3;
			vy = 0;
		}
		if (y < 0) { // HIT top wall
			vy = -vy
		}
		if (x > WIDTH) {// player 1 scores
			//start again
			x= WIDTH / 2;
			y = HEIGHT / 2;
			vx = 3;
			vy = 0;
		}
		if (y > HEIGHT) {// HIT Bottom wall
			vy = -vy;
		}
		var tol=5;
		if (vx < 0 && x < WIDTH / 2) {
			// only playerLeft can Hit the ball
			if (bottomy+tol > paddleLeft.y
					&& topy-tol < paddleLeft.y + paddleLeft.height
					&& bottomx-tol < paddleLeft.x + paddleLeft.width
					&& paddleLeft.x + paddleLeft.width-tol < topx) {
				vx = -vx + 1;
				if (vx > 5) {
					vx = 5;
				}
				if(paddleLeft.y+paddleLeft.height/2>y){
					vy=-1;
				}else if(paddleLeft.y+paddleLeft.height/2<y){
					vy=1;
				}else{
					vy=0;
				}
			}

		}
		if (vx > 0 && x > WIDTH / 2) {
			// only playerLeft can Hit the ball
			if (bottomy +tol> paddleRight.y
					&& topy-tol < paddleRight.y + paddleRight.height
					&& paddleRight.x -tol< topx && paddleRight.x+tol > bottomx) {
				vx = -vx - 1;
				if (vx < -5) {
					vx = -5;
				}
				if(paddleRight.y+paddleRight.height/2>y){
					vy=-1;
				}else if(paddleRight.y+paddleRight.height/2<y){
					vy=1;
				}else{
					vy=0;
				}
			}
		}

	}
	return {
		render : render,
		update : update
	}
};

var Paddle = function(params) {
	var x, y, width, height, vx, vy, color;
	x = params.x;
	y = params.y;
	width = params.width;
	height = params.height;
	vx = params.vx;
	vy = params.vy;
	color = params.color;
	hitSign = params.hitSign;
	var update = params.update;
	var render = function() {
		context.fillStyle = color;
		context.fillRect(x, y, width, height);
	}
	var move = function(xM, yM) {
		x =x + xM;
		y =y + yM;
		vx = x;
		vy = y;
		if (y < 0) { // all the way to the top
			y = 0;
			vy = 0;
		} else if (y + height > HEIGHT) { // all the way to the bottom
			y = HEIGHT - height;
			vy = 0;
		}
		if (x < 0) { // all the way to the left
			x = 0;
			vx = 0;
		} else if (x + width > WIDTH) { // all the way to the right
			x = WIDTH - width;
			vx = 0;
		}
		this.x=x;
		this.y=y;
	}

	return {
		render : render,
		move : move,
		update : update,
		x : x,
		y : y,
		width : width,
		height : height,
		vx : vx,
		vy : vy

	}

}
