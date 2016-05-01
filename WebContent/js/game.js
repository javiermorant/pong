
var WIDTH = 400;
var HEIGHT = 300;
var paddleWidth = 10;
var paddleHeight = 50;
var PADDLE_COLOR = "#FFFFFF";
var BALL_COLOR = "#FFFFFF";
var BACKGROUND = "#000000";
var MARGIN_0 = 10;
var animate = window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame || function(callback) {
			window.setTimeout(callback, 1000 / 60)
		};
var canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
var context = canvas.getContext('2d');

var controls1 = new arrowsMove({
	"left" : 65,
	"right" : 68,
	"up" : 87,
	"down" : 83,
	"stepSize" : 6
});

var controls2 = new arrowsMove({
	"left" : 37,
	"right" : 39,
	"up" : 38,
	"down" : 40,
	"stepSize" : 6
});

var player1 = new Paddle({
	"x" : MARGIN_0,
	"y" : (HEIGHT - paddleHeight) / 2,
	"width" : paddleWidth,
	"height" : paddleHeight,
	"vx" : 0,
	"vy" : 0,
	"color" : PADDLE_COLOR,
	"hitSign" : 1,
	"update" : controls1.move
});
var player2 = new Paddle({
	"x" : WIDTH - paddleWidth - MARGIN_0,
	"y" : (HEIGHT - paddleHeight) / 2,
	"width" : paddleWidth,
	"height" : paddleHeight,
	"vx" : 0,
	"vy" : 0,
	"color" : PADDLE_COLOR,
	"hitSign" : -1,
	"update" : controls2.move
});
var ball = new Ball({
	"x" : WIDTH / 2,
	"y" : HEIGHT / 2,
	"vx" : -3,
	"vy" : 0,
	"radius" : 5,
	"context" : context,
	"color" : BALL_COLOR
});
var controller = new PongController({
	"playerLeft" : player1,
	"playerRight" : player2,
	"ball" : ball,
	"context" : context
});
window.onload = function() {
	document.body.appendChild(canvas);
	animate(controller.step);
};
