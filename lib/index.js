const Block = require('./Blocks.js');
const Paddle = require('./Paddle.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();

var paddle = new Paddle(100,100);
paddle.draw(context);

var buildAnArray = block.buildArray();
block.buildBlocks(buildAnArray, context);

document.addEventListener('keydown',function(e) {
  if (e.keyCode === 39) {
    console.log(paddle.moveRight);
    paddle.moveRight();
  } else if (e.keyCode === 37) {
    console.log(27);
    paddle.moveLeft();
  }
});
