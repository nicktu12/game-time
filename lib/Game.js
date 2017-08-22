const Block = require('./Block.js');
const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');
const Powerup = require('./Powerup.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();
var paddle = new Paddle(225, 476);
var powerup = new Powerup(300, 0);
var ball = new Ball(paddle.x + 35, paddle.y - 6);

var container = document.getElementById('container');

var buildAnArray = block.buildLevelOne();

function gameLoop (e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw(context);
  ball.draw(context, paddle);
  powerup.draw(context)
  ball.bounceWalls(canvas.width);
  ball.bouncePaddleY(paddle);
  ball.bouncePaddleModulation(paddle);
  block.buildBlock(buildAnArray, context);
  block.breakBlock(buildAnArray, ball);
  powerup.hitsPaddle(paddle, ball);
  game.die(ball, canvas);
  game.levelUpAlert();
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
    for (var i = 0; i < buildAnArray.length; i++) {
      if (buildAnArray[i].unbreakable === false) {
        console.log(buildAnArray.length);
        buildAnArray.splice(i, 1)
      }
    }
  }
});

canvas.addEventListener('mousemove', function(e) {
  paddle.cursorHandler(e)
});

var newLifeButton = document.createElement('section');
var livesLeftInfoBar = document.getElementById('lives-left');
var levelUpModal = document.createElement('article');
var currentLevelInfoBar = document.getElementById('current-level');

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
      ball.resetBall();
      this.livesRemaining--;
      this.lives();
      document.body.appendChild(newLifeButton);
      newLifeButton.innerHTML = `
        <div id="lostLifeModal">
            <h2 class="lost-life">DEATH!</h2>
            <p class="lost-life-text">You are running low on lives - just ${this.livesRemaining} left! Click the button to continue on to your next life.</p>
            <button id="continue-to-next-life">Continue</button>
        </div>`
      ;
      this.nextLife(ball);
    }
  }

  nextLife(ball) {
    var continueToNewLife = document.getElementById('continue-to-next-life');
    continueToNewLife.addEventListener('click', function() {
      console.log(newLifeButton);
      ball.moveX = 2;
      ball.moveY = -2;
      newLifeButton.remove();
    });
  }

  lives() {
    if (this.livesRemaining === 0) {
      alert('Game Over');
      location.reload();
    } else {
      livesLeftInfoBar.innerHTML = `Lives Left: ${this.livesRemaining}`;
    }
  }

  levelUpAlert() {
    if (this.currentLevel === 1 && buildAnArray.length === 0) {
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = `
        <div id="levelUpModal">
            <h2 class="level-up">NICE!</h2>
            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
            <button id="continue-to-next-level">Continue</button>
        </div>`;
      this.currentLevel = 2;
      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`
      ball.resetBall();
      this.continueToLevelTwo();
    } else if (this.currentLevel === 2 && buildAnArray.length === 2) {
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = `
        <div id="levelUpModal">
            <h2 class="level-up">NICE!</h2>
            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
            <button id="continue-to-next-level">Continue</button>
        </div>`;
      this.currentLevel = 3;
      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`
      ball.resetBall();
      this.continueToLevelThree();
    } else if (this.currentLevel === 3 && buildAnArray.length === 0) {
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = `
        <div id="levelUpModal">
            <h2 class="level-up">NICE!</h2>
            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
            <button id="continue-to-next-level">Continue</button>
        </div>`;
      this.currentLevel = 4;
      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`
      ball.resetBall();
      this.continueToLevelFour();
    } else if (this.currentLevel === 4 && buildAnArray.length === 7) {
      ball.resetBall();
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = `
        <div id="level-up-modal">
            <h2 class="level-up">YOU WON!!!</h2>
            <p class="level-up-text">We didn't think this was possible.</p>
            <button id="play-again">Play Again</button>
        </div>`;
        ball.resetBall();
        this.currentLevel = 1;
        currentLevelInfoBar.innerHTML = `Current Level: 1`
        this.gameWon();
    }
  }

  continueToLevelTwo() {
    var levelUpBtn = document.getElementById('continue-to-next-level');
    levelUpBtn.addEventListener('click', function() {
      buildAnArray = block.buildLevelTwo();
      levelUpModal.remove();
    })
  }

  continueToLevelThree() {
    var levelUpBtn = document.getElementById('continue-to-next-level');
    levelUpBtn.addEventListener('click', function() {
      buildAnArray = block.buildLevelThree();
      levelUpModal.remove();
    })
  }

  continueToLevelFour() {
    var levelUpBtn = document.getElementById('continue-to-next-level');
    levelUpBtn.addEventListener('click', function() {
      console.log('play level 4 btn');
      buildAnArray = block.buildLevelFour();
      levelUpModal.remove();
    })
  }

  gameWon() {
    var playAgainBtn = document.getElementById('play-again');
    playAgainBtn.addEventListener('click', function() {
      console.log('clicked');
      buildAnArray = block.buildLevelOne();
      levelUpModal.remove();
    })
  }

}

var game = new Game();
var startButton = document.getElementById('start-btn');

startButton.addEventListener('click', function(){
  var directionsModal = document.getElementById('directions-modal');
  game.startGame(gameLoop);
  directionsModal.remove();
});

canvas.addEventListener('click', function() {
  ball.initiateVelocity();
})

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    ball.initiateVelocity();
  }
})

game.lives();

module.exports = Game;
