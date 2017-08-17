const Block = require('./Blocks.js');
const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();
var paddle = new Paddle(225, 476);
var ball = new Ball(canvas.width / 2, canvas.height - 50);

var gamePieces = [block, paddle, ball];

var buildAnArray = block.buildArray();

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw(context);
  ball.draw(context);
  ball.bounceWalls(canvas.width);
  ball.bouncePaddle(paddle);
  block.buildBlocks(buildAnArray, context);
  block.breakBlocks(buildAnArray, ball, context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 39) {
    paddle.moveRight();
  } else if (e.keyCode === 37) {
    paddle.moveLeft();
  }
});

module.exports = Game;
