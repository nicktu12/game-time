const Block = require('./Block.js');
const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');
const Powerup = require('./Powerup.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const block = new Block();
const paddle = new Paddle(225, 476);
const powerup = new Powerup(300, 0);
const ball = new Ball(paddle.x + 35, paddle.y - 6);

const newLifeButton = document.createElement('section');
const livesLeftInfoBar = document.getElementById('lives-left');
const levelUpModal = document.createElement('article');
const currentLevelInfoBar = document.getElementById('current-level');
const startButton = document.getElementById('start-btn');

let buildAnArray = block.buildLevelOne();

function gameLoop () {
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

document.addEventListener('keydown', keyHandler);

function keyHandler(e) {
  if (e.keyCode === 39) {
    paddle.moveRight();
  } else if (e.keyCode === 37) {
    paddle.moveLeft();
  } else if (e.keyCode === 65) {
    cheatCode();
  }
}

function cheatCode() {
  for (let i = 0; i < buildAnArray.length; i++) {
    if (buildAnArray[i].unbreakable === false) {
      buildAnArray.splice(i, 1)
    }
  }
}

canvas.addEventListener('mousemove', function(e) {
  paddle.cursorHandler(e)
});

canvas.addEventListener('click', function() {
  ball.initiateVelocity();
});

startButton.addEventListener('click', function() {
  let directionsModal = document.getElementById('directions-modal');

  game.startGame(gameLoop);
  directionsModal.remove();
});

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
      this.livesCounter();
      document.body.appendChild(newLifeButton);
      newLifeButton.innerHTML = `
        <div id="lostLifeModal">
            <h2 class="lost-life">DEATH!</h2>
            <p class="lost-life-text">You are running low on lives - just ${this.livesRemaining} left!
            Click the button to continue on to your next life.</p>
            <button id="continue-to-next-life">Continue</button>
        </div>`
      ;
      this.nextLife(ball);
    }
  }

  nextLife(ball) {
    let continueToNewLife = document.getElementById('continue-to-next-life');

    continueToNewLife.addEventListener('click', function() {
      ball.moveX = 2;
      ball.moveY = -2;
      newLifeButton.remove();
    });
  }

  livesCounter() {
    if (this.livesRemaining === 0) {
      alert('Game Over');
      location.reload();
    } else {
      livesLeftInfoBar.innerHTML = `Lives Left: ${this.livesRemaining}`;
    }
  }

  levelUpAlert() {
    let levelUpAppend = `<div id="levelUpModal">
        <h2 class="level-up">NICE!</h2>
        <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
        <button id="continue-to-next-level">Continue</button>
        </div>`;

    let wonGameAppend = `
      <div id="level-up-modal">
          <h2 class="level-up">YOU WON!!!</h2>
          <p class="level-up-text">We didn't think this was possible.</p>
          <button id="play-again">Play Again</button>
      </div>`;

    if (this.currentLevel === 1 && buildAnArray.length === 0) {
      this.currentLevel = 2;
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = levelUpAppend;
      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`
      ball.resetBall();
      this.continueToLevelTwo();
    } else if (this.currentLevel === 2 && buildAnArray.length === 2) {
      this.currentLevel = 3;
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = levelUpAppend;
      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`
      ball.resetBall();
      this.continueToLevelThree();
    } else if (this.currentLevel === 3 && buildAnArray.length === 0) {
      this.currentLevel = 4;
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = levelUpAppend;
      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`
      ball.resetBall();
      this.continueToLevelFour();
    } else if (this.currentLevel === 4 && buildAnArray.length === 7) {
      this.currentLevel = 1;
      document.body.appendChild(levelUpModal);
      levelUpModal.innerHTML = wonGameAppend;
      ball.resetBall();
      currentLevelInfoBar.innerHTML = `Current Level: 1`
      this.gameWon();
    }
  }

  continueToLevelTwo() {
    let levelUpBtn = document.getElementById('continue-to-next-level');

    levelUpBtn.addEventListener('click', function() {
      buildAnArray = block.buildLevelTwo();
      levelUpModal.remove();
    })
  }

  continueToLevelThree() {
    let levelUpBtn = document.getElementById('continue-to-next-level');

    levelUpBtn.addEventListener('click', function() {
      buildAnArray = block.buildLevelThree();
      levelUpModal.remove();
    })
  }

  continueToLevelFour() {
    let levelUpBtn = document.getElementById('continue-to-next-level');

    levelUpBtn.addEventListener('click', function() {
      buildAnArray = block.buildLevelFour();
      levelUpModal.remove();
    })
  }

  gameWon() {
    let playAgainBtn = document.getElementById('play-again');

    playAgainBtn.addEventListener('click', function() {
      buildAnArray = block.buildLevelOne();
      levelUpModal.remove();
    })
  }

}

const game = new Game();

game.livesCounter();

module.exports = Game;
