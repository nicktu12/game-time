const Block = require('./Blocks.js');
const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();
var paddle = new Paddle(100, 100);
var ball = new Ball();

var gamePieces = [block, paddle, ball];

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw(context);
  ball.draw(context);
  var buildAnArray = block.buildArray();
  block.buildBlocks(buildAnArray, context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('keydown', function(e) {
  console.log('hi');
  if (e.keyCode === 39) {
    console.log('right');
    paddle.moveRight();
  } else if (e.keyCode === 37) {
    console.log('left');
    paddle.moveLeft();
  }
});
