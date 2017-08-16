const Block = require('./Blocks.js');
const Paddle = require('./Paddle.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();

var paddle = new Paddle(100,100);

var gamePieces = [block, paddle];

function gameLoop () {
  context.clearRect(0,0,canvas.width,canvas.height);
  paddle.draw(context);
  var buildAnArray = block.buildArray();
  block.buildBlocks(buildAnArray, context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener('keydown',function(e) {
  if (e.keyCode === 39) {
    paddle.moveRight();
  } else if (e.keyCode === 37) {
    paddle.moveLeft();
  }
});
