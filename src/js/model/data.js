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
	}
	 var getX = function() { 
		 return x;
	 }
	 var setX = function(value) { 
		  x = value;
	 }
	 var getY = function() { 
		 return y;
	 }
	 var setY = function(value) { 
		  y = value;
	 }
	 var getVY = function() { 
		 return vy;
	 }
	 var setVY = function(value) { 
		  vy = value;
	 }
	 var getVX = function() { 
		 return vx;
	 }
	 var setVX = function(value) { 
		  vx = value;
	 }
	 var getRadius = function() { 
		 return radius;
	 }
	 var setRadius = function(value) { 
		  radius = value;
	 }
	return {
		getX:getX,
		getY:getY,
		getVX:getVX,
		getVY:getVY,
		setX:setX,
		setY:setY,
		setVX:setVX,
		setVY:setVY,
		getRadius:getRadius,
		setRadius:setRadius,
		radius : radius,
		render : render,
		update : update
	}
};

var Paddle = function(params) {
	var x, y, width, height, vx, vy, color,hitSign;
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
		if (y < 3) { // all the way to the top
			y = 3;
			vy = 0;
		} else if (y + height > HEIGHT - 3) { // all the way to the bottom
			y = HEIGHT - height-3;
			vy = 0;
		}
		if (x < 3) { // all the way to the left
			x = 3;
			vx = 0;
		} else if (x + width > WIDTH-3) { // all the way to the right
			x = WIDTH - width-3;
			vx = 0;
		}
		var limit=WIDTH/8;
		if(hitSign===1&&x>(WIDTH/2)-limit-width){
			x=(WIDTH/2)-limit-width;
		}
		if(hitSign===-1&&x<WIDTH/2+limit){
			x=WIDTH/2+limit;
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
