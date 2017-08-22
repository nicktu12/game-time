/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(2);
	const Paddle = __webpack_require__(4);
	const Ball = __webpack_require__(5);
	const Powerup = __webpack_require__(3);

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');

	var block = new Block();
	var paddle = new Paddle(225, 476);
	var powerup = new Powerup(300, 0);
	var ball = new Ball(paddle.x + 35, paddle.y - 6);

	var buildAnArray = block.buildLevelOne();

	function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  paddle.draw(context);
	  ball.draw(context, paddle);
	  powerup.draw(context);
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

	document.addEventListener('keydown', function (e) {
	  if (e.keyCode === 39) {
	    paddle.moveRight();
	  } else if (e.keyCode === 37) {
	    paddle.moveLeft();
	  }
	});

	document.addEventListener('keydown', function (e) {
	  if (e.keyCode === 65) {
	    for (let i = 0; i < buildAnArray.length; i++) {
	      if (buildAnArray[i].unbreakable === false) {
	        buildAnArray.splice(i, 1);
	      }
	    }
	  }
	});

	canvas.addEventListener('mousemove', function (e) {
	  paddle.cursorHandler(e);
	});

	const newLifeButton = document.createElement('section');
	const livesLeftInfoBar = document.getElementById('lives-left');
	const levelUpModal = document.createElement('article');
	const currentLevelInfoBar = document.getElementById('current-level');

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
	            <p class="lost-life-text">You are running low on lives - just ${this.livesRemaining} left!
	            Click the button to continue on to your next life.</p>
	            <button id="continue-to-next-life">Continue</button>
	        </div>`;
	      this.nextLife(ball);
	    }
	  }

	  nextLife(ball) {
	    let continueToNewLife = document.getElementById('continue-to-next-life');

	    continueToNewLife.addEventListener('click', function () {
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
	      this.currentLevel = 2;
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">NICE!</h2>
	            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel}.</p>
	            <button id="continue-to-next-level">Continue</button>
	        </div>`;
	      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`;
	      ball.resetBall();
	      this.continueToLevelTwo();
	    } else if (this.currentLevel === 2 && buildAnArray.length === 2) {
	      this.currentLevel = 3;
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">NICE!</h2>
	            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel}.</p>
	            <button id="continue-to-next-level">Continue</button>
	        </div>`;
	      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`;
	      ball.resetBall();
	      this.continueToLevelThree();
	    } else if (this.currentLevel === 3 && buildAnArray.length === 0) {
	      this.currentLevel = 4;
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">NICE!</h2>
	            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel}.</p>
	            <button id="continue-to-next-level">Continue</button>
	        </div>`;
	      currentLevelInfoBar.innerHTML = `Current Level: ${this.currentLevel}`;
	      ball.resetBall();
	      this.continueToLevelFour();
	    } else if (this.currentLevel === 4 && buildAnArray.length === 7) {
	      this.currentLevel = 1;
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="level-up-modal">
	            <h2 class="level-up">YOU WON!!!</h2>
	            <p class="level-up-text">We didn't think this was possible.</p>
	            <button id="play-again">Play Again</button>
	        </div>`;
	      ball.resetBall();
	      currentLevelInfoBar.innerHTML = `Current Level: 1`;
	      this.gameWon();
	    }
	  }

	  continueToLevelTwo() {
	    let levelUpBtn = document.getElementById('continue-to-next-level');

	    levelUpBtn.addEventListener('click', function () {
	      buildAnArray = block.buildLevelTwo();
	      levelUpModal.remove();
	    });
	  }

	  continueToLevelThree() {
	    let levelUpBtn = document.getElementById('continue-to-next-level');

	    levelUpBtn.addEventListener('click', function () {
	      buildAnArray = block.buildLevelThree();
	      levelUpModal.remove();
	    });
	  }

	  continueToLevelFour() {
	    let levelUpBtn = document.getElementById('continue-to-next-level');

	    levelUpBtn.addEventListener('click', function () {
	      buildAnArray = block.buildLevelFour();
	      levelUpModal.remove();
	    });
	  }

	  gameWon() {
	    let playAgainBtn = document.getElementById('play-again');

	    playAgainBtn.addEventListener('click', function () {
	      buildAnArray = block.buildLevelOne();
	      levelUpModal.remove();
	    });
	  }

	}

	const game = new Game();
	const startButton = document.getElementById('start-btn');

	startButton.addEventListener('click', function () {
	  let directionsModal = document.getElementById('directions-modal');

	  game.startGame(gameLoop);
	  directionsModal.remove();
	});

	canvas.addEventListener('click', function () {
	  ball.initiateVelocity();
	});

	document.addEventListener('keydown', function (e) {
	  if (e.keyCode === 32) {
	    ball.initiateVelocity();
	  }
	});

	game.lives();

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Powerup = __webpack_require__(3);

	class Block {

	  constructor(x, y, special = false, unbreakable = false) {
	    this.x = x;
	    this.y = y;
	    this.width = 50;
	    this.height = 10;
	    this.status = 1;
	    this.special = special;
	    this.unbreakable = unbreakable;
	  }

	  draw(context) {
	    if (this.special === true) {
	      context.fillStyle = '#99FF66';
	      context.fillRect(this.x, this.y, this.width, this.height);
	    } else if (this.unbreakable === true) {
	      context.fillStyle = '#EFECF0';
	      context.fillRect(this.x, this.y, this.width, this.height);
	    } else {
	      context.fillStyle = '#FF0066';
	      context.fillRect(this.x, this.y, this.width, this.height);
	    }
	  }

	  randomSpecialBlocks(arr) {
	    let buffer = [],
	        start;

	    for (let i = arr.length; i >= arr.length && i > 0; i--) {
	      start = Math.floor(Math.random() * arr.length);
	      buffer.push(arr.splice(start, 1)[0]);
	    }
	    return buffer;
	  }

	  buildLevelOne() {
	    let levelOneArray = [];

	    for (let i = 0; i < 24; i++) {
	      this.x = 6.25 + i % 8 * 50 * 1.25;
	      this.y = 6 + i % 3 * 10 * 2;
	      levelOneArray.push(new Block(this.x, this.y));
	    }
	    levelOneArray = this.randomSpecialBlocks(levelOneArray);
	    levelOneArray[0].special = true;
	    levelOneArray[1].special = true;
	    return levelOneArray;
	  }

	  buildLevelTwo() {
	    let levelTwoArray = [];

	    for (let i = 0; i < 12; i++) {
	      if (i === 7) {
	        this.unbreakable = true;
	        this.x = 6.25 + i % 3 * 50 * 1.25;
	        this.y = 6 + i % 4 * 10 * 2;
	        levelTwoArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 6.25 + i % 3 * 50 * 1.25;
	        this.y = 6 + i % 4 * 10 * 2;
	        levelTwoArray.push(new Block(this.x, this.y));
	      }
	    }

	    for (let i = 0; i < 12; i++) {
	      if (i === 7) {
	        this.unbreakable = true;
	        this.x = 312.5 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 6 + i % 4 * 10 * 2;
	        levelTwoArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 312.5 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 6 + i % 4 * 10 * 2;
	        levelTwoArray.push(new Block(this.x, this.y));
	      }
	    }
	    return levelTwoArray;
	  }

	  buildLevelThree() {
	    let levelThreeArray = [];

	    for (let i = 0; i < 24; i++) {
	      this.x = 193.75 + i % 2 * 50 * 1.25;
	      this.y = 125 + i % 3 * 10 * 2;
	      levelThreeArray.push(new Block(this.x, this.y));
	    }
	    return levelThreeArray;
	  }

	  buildLevelFour() {
	    let levelFourArray = [];

	    for (let i = 0; i < 12; i++) {
	      if (i === 11) {
	        this.unbreakable = true;
	        this.x = 6.25 + i % 3 * 50 * 1.25;
	        this.y = 6 + i % 4 * 10 * 2;
	        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 6.25 + i % 3 * 50 * 1.25;
	        this.y = 6 + i % 4 * 10 * 2;
	        levelFourArray.push(new Block(this.x, this.y));
	      }
	    }

	    for (let i = 0; i < 12; i++) {
	      if (i === 3) {
	        this.unbreakable = true;
	        this.x = 312.5 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 6 + i % 4 * 10 * 2;
	        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 312.5 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 6 + i % 4 * 10 * 2;
	        levelFourArray.push(new Block(this.x, this.y));
	      }
	    }

	    for (let i = 0; i < 12; i++) {
	      if (i === 7) {
	        this.unbreakable = true;
	        this.x = 156.25 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 88 + (6 + i % 4 * 10 * 2);
	        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 156.25 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 88 + (6 + i % 4 * 10 * 2);
	        levelFourArray.push(new Block(this.x, this.y));
	      }
	    }

	    for (let i = 0; i < 12; i++) {
	      if (i === 3 || i === 11) {
	        this.unbreakable = true;
	        this.x = 6.25 + i % 3 * 50 * 1.25;
	        this.y = 172 + (6 + i % 4 * 10 * 2);
	        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 6.25 + i % 3 * 50 * 1.25;
	        this.y = 172 + (6 + i % 4 * 10 * 2);
	        levelFourArray.push(new Block(this.x, this.y));
	      }
	    }

	    for (let i = 0; i < 12; i++) {
	      if (i === 3 || i === 11) {
	        this.unbreakable = true;
	        this.x = 312.5 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 172 + (6 + i % 4 * 10 * 2);
	        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
	      } else {
	        this.x = 312.5 + (6.25 + i % 3 * 50 * 1.25);
	        this.y = 172 + (6 + i % 4 * 10 * 2);
	        levelFourArray.push(new Block(this.x, this.y));
	      }
	    }
	    return levelFourArray;
	  }

	  buildBlock(array, context) {
	    for (let i = 0; i < array.length; i++) {
	      array[i].draw(context);
	    }
	  }

	  breakBlock(array, ball) {
	    for (let i = 0; i < array.length; i++) {
	      if (ball.y + 6 >= array[i].y && ball.y - 6 <= array[i].y + 10 && ball.x <= array[i].x + 50 && ball.x >= array[i].x) {
	        ball.moveY = -ball.moveY;
	        if (array[i].unbreakable === true) {
	          return;
	        }
	        if (array[i].special === true) {
	          // this is where powerup shit happens
	        }
	        array.splice(i, 1);
	      }
	    }
	  }
	}

	module.exports = Block;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class Powerup {

	  constructor(x, y) {
	    this.x = x, this.y = y, this.moveY = 1.3;
	  }

	  draw(context) {
	    context.fillStyle = 'yellow';
	    context.fillRect(this.x, this.y, 5, 5);
	    this.y += this.moveY;
	  }

	  hitsPaddle(paddle, ball) {
	    if (this.y + 5 >= paddle.y && this.x <= paddle.x + 50 && this.x + 5 >= paddle.x) {
	      this.y = -10;
	      this.moveY = 0;
	      ball.fastBall();
	    }
	  }

	  // current powerups:
	  // ball.slowBall();
	  // ball.fastBall();
	  // paddle.longPaddle();


	}

	module.exports = Powerup;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class Paddle {

	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.width = 50;
	    this.height = 12;
	  }

	  draw(context) {
	    context.fillStyle = '#33CCFF';
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  moveRight() {
	    if (this.x + this.width < 499) {
	      this.x += 10;
	    }
	  }

	  moveLeft() {
	    if (this.x > 1) {
	      this.x -= 10;
	    }
	  }

	  cursorHandler(e) {
	    let cursorX = e.clientX - canvas.offsetLeft;

	    this.x = cursorX - this.width / 2;
	    if (cursorX <= this.width / 2) {
	      this.x = 0;
	    } else if (cursorX > canvas.width - this.width / 2) {
	      this.x = canvas.width - this.width;
	    }
	  }

	  longPaddle() {
	    this.width = this.width * 1.75;
	  }

	  shortPaddle() {
	    this.width = this.width * .4;
	  }

	}

	module.exports = Paddle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(6);

	class Ball extends GamePiece {

	  constructor(x, y) {
	    super(x, y);
	    this.width = 6;
	    this.height = 6;
	    this.moveX = 0;
	    this.moveY = -0;
	  }

	  draw(context, paddle) {
	    context.beginPath();
	    context.arc(this.x, this.y, 6, 0, Math.PI * 2);
	    context.fillStyle = '#FFFF33';
	    context.fill();
	    context.closePath();
	    if (this.moveX === 0) {
	      this.x = paddle.x + 35;
	      this.y = paddle.y - 6;
	    } else {
	      this.x += this.moveX;
	      this.y += this.moveY;
	    }
	  }

	  initiateVelocity() {
	    if (this.moveX === 0) {
	      this.moveX = 2;
	      this.moveY = -2;
	    }
	  }

	  resetBall() {
	    this.moveX = 0;
	    this.moveY = 0;
	  }

	  bounceWalls(canvasWidth) {
	    if (this.x + 6 >= canvasWidth) {
	      this.moveX = -this.moveX;
	    } else if (this.x - 6 <= 0) {
	      this.moveX = -this.moveX;
	    } else if (this.y - 6 <= 0) {
	      this.moveY = -this.moveY;
	    }
	  }

	  bouncePaddleY(paddle) {
	    let paddleRight = paddle.x + 50;
	    let paddleLeft = paddle.x;

	    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleRight) {
	      if (this.moveY > 4 || this.moveY < -4) {
	        this.moveY = -this.moveY;
	      } else {
	        this.moveY = -this.moveY * 1.1;
	      }
	    }
	  }

	  bouncePaddleModulation(paddle) {
	    let paddleRight = paddle.x + 50;
	    let paddleLeft = paddle.x;

	    if (this.y === paddle.y - 6 && this.x > paddleLeft + 30 && this.x < paddleLeft + 40) {
	      if (this.moveX < 4 || this.moveX > -4) {
	        if (this.moveX < 0) {
	          this.moveX = this.moveX * .9;
	        } else {
	          this.moveX = this.moveX * 1.1;
	        }
	      }
	    }

	    if (this.y === paddle.y - 6 && this.x > paddleLeft + 40 && this.x < paddleRight) {
	      if (this.moveX < 4 || this.moveX > -4) {
	        if (this.moveX < 0) {
	          this.moveX = this.moveX * .7;
	        } else {
	          this.moveX = this.moveX * 1.3;
	        }
	      }
	    }

	    if (this.y === paddle.y - 6 && this.x > paddleLeft + 10 && this.x < paddleLeft + 20) {
	      if (this.moveX < 4 || this.moveX > -4) {
	        if (this.moveX > 0) {
	          this.moveX = this.moveX * .9;
	        } else {
	          this.moveX = this.moveX * 1.1;
	        }
	      }
	    }

	    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleLeft + 10) {
	      if (this.moveX < 4 || this.moveX > -4) {
	        if (this.moveX > 0) {
	          this.moveX = this.moveX * .7;
	        } else {
	          this.moveX = this.moveX * 1.3;
	        }
	      }
	    }
	  }

	  slowBall() {
	    this.moveX = this.moveX / 2;
	    this.moveY = this.moveY / 2;
	  }

	  fastBall() {
	    this.moveX = this.moveX * 2;
	    this.moveY = this.moveY * 2;
	  }

	}

	module.exports = Ball;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	
	class GamePiece {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }

	}

	module.exports = GamePiece;

/***/ })
/******/ ]);