var arrowsMove = function(params) {
	var left, right, up, down, stepSize;
	left = params.left;
	right = params.right;
	up = params.up;
	down = params.down;
	stepSize = params.stepSize;

	var move = function() {
		for ( var key in keysDown) {
			var value = Number(key);
			if (value == left) { 
				this.move(-stepSize, 0);
			} else if (value == right) { 
				this.move(stepSize, 0);
			} else if (value == up) { 
				this.move(0, -stepSize);
			} else if (value == down) { 
				this.move(0, stepSize);
			} else {
				this.move(0, 0);
			}
		}
	}
	return {
		move : move
	}
}
