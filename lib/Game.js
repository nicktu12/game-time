const Block = require('./Blocks.js');
const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();
var paddle = new Paddle(225, 476);
var ball = new Ball(canvas.width / 2, canvas.height - 50);

var container = document.getElementById('container');

var buildAnArray = block.buildLevelOne();
console.log(buildAnArray);

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw(context);
  ball.draw(context);
  ball.bounceWalls(canvas.width);
  ball.bouncePaddle(paddle);
  block.buildBlocks(buildAnArray, context);
  block.breakBlocks(buildAnArray, ball, context);
  game.die(ball, canvas);
  game.levelUp();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 39) {
    paddle.moveRight();
  } else if (e.keyCode === 37) {
    paddle.moveLeft();
  }
});


document.addEventListener('keydown', function(e) {
  if (e.keyCode === 65) {
    buildAnArray.length = 0;
  }
});

var newLifeButton = document.createElement('button');
var livesCounterOnDom = document.createElement('p');

// var t = document.createTextNode("Start next life");

class Game {

  constructor() {
    this.livesRemaining = 3;
    this.currentLevel = 1;
  }

  startGame(gameLoop) {
    requestAnimationFrame(gameLoop);
  }

  die(ball, canvas) {
    if (ball.y - 12 >= canvas.height) {
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 50;
      ball.moveX = 0;
      ball.moveY = 0;
      this.livesRemaining--;
      this.lives();
      document.body.appendChild(newLifeButton);
      newLifeButton.innerHTML =
        "<p id='start-next-life-button'>Start Next Life</p>"
      ;
      this.nextLife(ball);
    }
  }

  nextLife(ball) {
    newLifeButton.addEventListener('click', function() {
      console.log(ball.moveX);
      ball.moveX = 2;
      ball.moveY = -2;
    });
  }

  lives() {
    if (this.livesRemaining === 0) {
      alert('Game Over');
      location.reload();
    } else {
      document.body.appendChild(livesCounterOnDom);
      livesCounterOnDom.innerHTML = `Lives Left: ${this.livesRemaining}`;
    }
  }

  levelUp() {
    if (this.currentLevel === 1 && buildAnArray.length === 0) {
      alert('Good job!')
      this.currentLevel = 2;
      buildAnArray = block.buildLevelTwo();
    } else if (this.currentLevel === 2 && buildAnArray.length === 0) {
      alert('Good job!')
      this.currentLevel = 3;
      buildAnArray = block.buildLevelThree();
    } else if (this.currentLevel === 3 && buildAnArray.length === 0) {
      alert('Good job!')
      this.currentLevel = 4;
      buildAnArray = block.buildLevelFour();
    }
  }



}

var game = new Game();
var startButton = document.getElementById('start-button');

startButton.addEventListener('click', function(){
  game.startGame(gameLoop);
  startButton.disabled = true;
});

game.lives();

// newLifeButton.addEventListener('click', function(ball) {
//   console.log('hii');
//   var ball = new Ball(canvas.width / 2, canvas.height - 50);
//   game.startGame(gameLoop);
// });


module.exports = Game;
