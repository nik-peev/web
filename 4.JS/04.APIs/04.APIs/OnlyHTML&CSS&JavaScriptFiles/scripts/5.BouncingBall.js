var content = document.getElementById("content");
var context = content.getContext("2d");

var x = 100;
var y = 100;
var RADIUS = 25;
var directionX = 10;
var directionY = 10;

function draw() {
	context.clearRect(0, 0, content.width, content.height);
	context.beginPath();
	context.arc(x, y, RADIUS, 0, 2 * Math.PI, false);
	context.closePath();
	context.fill();

	if (x < 25 || x > content.width - 25) {
		directionX = - directionX;
	}
	else if (y < 25 || y > content.height - 25) {
		directionY = - directionY;
	};

	x = x + directionX;
	y = y + directionY;
}

setInterval(draw, 15);