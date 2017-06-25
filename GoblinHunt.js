// Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "GoblinHunt/background.png";


//Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "GoblinHunt/hero.png";


//Goblin image
var goblinReady = false;
var goblinImage = new Image();
goblinImage.onload = function () {
	goblinReady = true;
};
goblinImage.src = "GoblinHunt/goblin.png";

//Game objects
var hero = {
	speed: 256, //movement in pixels per second
	x: 0,
	y: 0
};

var goblin = {
	x: 0,
	y: 0
};

var goblinsCaught = 0;


//Keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


//Reset game when player catches goblin
var reset = function () {
	hero.x = canvas.width / 2;
	her.y = canvas.height /2;

	//Respawn goblin in random position
	goblin.x = 32 + (Math.random() * (canvas.width - 64));
	goblin.y = 32 + (Math.random() * (canvas.height - 64));
};


//Update game objects
var update = function (modifier) {
	if (38 in keysDown) {//Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) {//Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in KeysDown) {//Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) {//Player holding right
		hero.x += hero.speed * modifier;
	}

	//Are they touching?
	if (
		hero.x <= (goblin.x + 32)
		&& goblin.x <= (hero.x + 32)
		&& hero.y <= (goblin.y + 32)
		&& goblin.y <= (hero.y + 32)
		) {
		++goblinsCaught;
		reset();
	}
};


//Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (goblinReady) {
		ctx.drawImage(goblinImage, goblin.x, goblin.y);
	}

	//Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins Caught: " + goblinsCaught, 32, 32);
};


//The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	//Request to do this again ASAP
	requestAnimationFrame(main);
};


//Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


//Let's play the game!
var then = Date.now();
reset();
main();