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
	const Paddle = __webpack_require__(3);
	const Ball = __webpack_require__(4);

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');

	var block = new Block();
	var paddle = new Paddle(225, 476);
	var ball = new Ball(paddle.x + 35, paddle.y - 8);

	var container = document.getElementById('container');

	var buildAnArray = block.buildLevelOne();

	function gameLoop(e) {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  paddle.draw(context);
	  ball.draw(context, paddle);
	  ball.bounceWalls(canvas.width);
	  ball.bouncePaddleY(paddle);
	  ball.bouncePaddleModulation(paddle);
	  block.buildblock(buildAnArray, context);
	  block.breakblock(buildAnArray, ball, game);
	  game.die(ball, canvas);
	  game.levelUpAlert();
	  game.levelUpAlert(context);
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
	    for (var i = 0; i < buildAnArray.length; i++) {
	      if (buildAnArray[i].unbreakable === false) {
	        console.log(buildAnArray.length);
	        buildAnArray.splice(i, 1);
	      }
	    }
	  }
	});

	canvas.addEventListener('mousemove', function (e) {
	  paddle.cursorHandler(e);
	});

	var newLifeButton = document.createElement('section');
	var livesCounterOnDom = document.createElement('aside');
	var levelUpModal = document.createElement('article');

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
	      newLifeButton.innerHTML = `
	        <div id="lostLifeModal">
	            <h2 class="lost-life">DEATH!</h2>
	            <p class="lost-life-text">You are running low on lives - just ${this.livesRemaining} left! Click the button to continue on to your next life.</p>
	            <button id="continue-to-next-life">Continue</button>
	        </div>`;
	      this.nextLife(ball);
	    }
	  }

	  nextLife(ball) {
	    var continueToNewLife = document.getElementById('continue-to-next-life');
	    continueToNewLife.addEventListener('click', function () {
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
	      document.body.appendChild(livesCounterOnDom);
	      livesCounterOnDom.innerHTML = `Lives Left: ${this.livesRemaining}`;
	    }
	  }

	  levelUpAlert(array, context) {
	    if (this.currentLevel === 1 && buildAnArray.length === 0) {
	      //ball needs to stop moving RIGHT HERE
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">NICE!</h2>
	            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
	            <button id="continue-to-next-level">Continue</button>
	        </div>`;
	      this.currentLevel = 2;
	      this.continueToLevelTwo();
	    } else if (this.currentLevel === 2 && buildAnArray.length === 2) {
	      //ball needs to stop moving RIGHT HERE
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">NICE!</h2>
	            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
	            <button id="continue-to-next-level">Continue</button>
	        </div>`;
	      this.currentLevel = 3;
	      this.continueToLevelThree();
	      buildAnArray = block.buildLevelThree();
	    } else if (this.currentLevel === 3 && buildAnArray.length === 0) {
	      //ball needs to stop moving RIGHT HERE
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">NICE!</h2>
	            <p class="level-up-text">On to the next challenge! Click the button to start level ${this.currentLevel + 1}.</p>
	            <button id="continue-to-next-level">Continue</button>
	        </div>`;
	      this.currentLevel = 4;
	      this.continueToLevelFour();
	      buildAnArray = block.buildLevelFour();
	    } else if (this.currentLevel === 4 && buildAnArray.length === 7) {
	      //ball needs to stop moving RIGHT HERE
	      document.body.appendChild(levelUpModal);
	      levelUpModal.innerHTML = `
	        <div id="levelUpModal">
	            <h2 class="level-up">YOU WON!!!</h2>
	            <p class="level-up-text">We didn't think this was possible.</p>
	            <button id="continue-to-next-level">Play Again</button>
	        </div>`;
	    }
	  }

	  continueToLevelTwo() {
	    var levelUpBtn = document.getElementById('continue-to-next-level');
	    levelUpBtn.addEventListener('click', function () {
	      buildAnArray = block.buildLevelTwo();
	      levelUpModal.remove();
	    });
	  }

	  continueToLevelThree() {
	    var levelUpBtn = document.getElementById('continue-to-next-level');
	    levelUpBtn.addEventListener('click', function () {
	      buildAnArray = block.buildLevelThree();
	      levelUpModal.remove();
	    });
	  }

	  continueToLevelFour() {
	    var levelUpBtn = document.getElementById('continue-to-next-level');
	    levelUpBtn.addEventListener('click', function () {
	      console.log('play level 4 btn');
	      buildAnArray = block.buildLevelFour();
	      levelUpModal.remove();
	    });
	  }

	}

	var game = new Game();
	var startButton = document.getElementById('start-btn');

	startButton.addEventListener('click', function () {
	  game.startGame(gameLoop);
	  startButton.disabled = true;
	  startButton.style.backgroundColor = '#b4b4b4';
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
/***/ (function(module, exports) {

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

	  //   Array.prototype.randomElement = function () {
	  //     return this[Math.floor(Math.random() * this.length)]
	  // }

	  specialBlock(array, numberOfSpecialblock) {
	    for (var i = 0; i < numberOfSpecialblock; i++) {
	      array[Math.floor(Math.random() * array.length)].special = true;
	    }
	  }

	  buildLevelOne() {
	    let levelOneArray = [];
	    for (var i = 0; i < 24; i++) {
	      this.x = 6.25 + i % 8 * 50 * 1.25;
	      this.y = 6 + i % 3 * 10 * 2;
	      levelOneArray.push(new Block(this.x, this.y));
	    }
	    this.specialBlock(levelOneArray, 2);
	    return levelOneArray;
	  }

	  buildLevelTwo() {
	    let levelTwoArray = [];

	    for (var i = 0; i < 12; i++) {
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

	    for (var i = 0; i < 12; i++) {
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

	  buildLevelThree(context) {
	    let levelThreeArray = [];

	    for (var i = 0; i < 24; i++) {
	      this.x = 193.75 + i % 2 * 50 * 1.25;
	      this.y = 125 + i % 3 * 10 * 2;
	      levelThreeArray.push(new Block(this.x, this.y));
	    }

	    return levelThreeArray;
	  }

	  buildLevelFour() {
	    let levelFourArray = [];

	    for (var i = 0; i < 12; i++) {
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

	    for (var i = 0; i < 12; i++) {
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

	    for (var i = 0; i < 12; i++) {
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

	    for (var i = 0; i < 12; i++) {
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

	    for (var i = 0; i < 12; i++) {
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

	  buildblock(array, context) {
	    for (var i = 0; i < array.length; i++) {
	      array[i].draw(context);
	      //assign each block it's own status of 1
	    }
	  }

	  // buildblockLevelThree(array, context) {
	  //   for (var i = 0; i < array.length; i++) {
	  //     array[i].drawSmall(context);
	  //   }
	  // }

	  breakblock(array, ball, game) {
	    for (var i = 0; i < array.length; i++) {
	      if (ball.y + 4 >= array[i].y && ball.y - 4 <= array[i].y + 10 && ball.x <= array[i].x + 50 && ball.x >= array[i].x) {
	        ball.moveY = -ball.moveY;
	        if (array[i].unbreakable === true) {
	          return;
	        };
	        array.splice(i, 1);
	      }
	    }
	  }
	}

	module.exports = Block;

/***/ }),
/* 3 */
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
	    if (this.x + 50 < 499) {
	      this.x += 10;
	      console.log(this.x);
	    }
	  }

	  moveLeft() {
	    if (this.x > 1) {
	      this.x -= 10;
	      console.log(this.x);
	    }
	  }

	  cursorHandler(e) {
	    var cursorX = e.clientX - canvas.offsetLeft;
	    this.x = cursorX - 25;

	    if (cursorX <= 25) {
	      this.x = 0;
	    } else if (cursorX > canvas.width - 25) {
	      this.x = canvas.width - 50;
	    }
	  }

	}

	module.exports = Paddle;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class Ball {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.width = 8;
	    this.height = 8;
	    this.moveX = 0;
	    this.moveY = -0;
	  }

	  draw(context, paddle) {
	    context.beginPath();
	    context.arc(this.x, this.y, 8, 0, Math.PI * 2);
	    context.fillStyle = '#FFFF33';
	    context.fill();
	    context.closePath();
	    if (this.moveX === 0) {
	      this.x = paddle.x + 35;
	      this.y = paddle.y - 8;
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

	  // refactor to create move method

	  bounceWalls(canvasWidth) {
	    if (this.x + 4 >= canvasWidth) {
	      this.moveX = -this.moveX;
	    } else if (this.x - 4 <= 0) {
	      this.moveX = -this.moveX;
	    } else if (this.y - 4 <= 0) {
	      this.moveY = -this.moveY;
	    }
	  }

	  bouncePaddleY(paddle) {
	    let paddleRight = paddle.x + 50;
	    let paddleLeft = paddle.x;

	    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleRight) {
	      if (this.moveY > 2 || this.moveY < -2) {
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

	    if (Math.random() > .8) {
	      // console.log(this.moveX);
	    }
	  }
	}

	module.exports = Ball;

/***/ })
/******/ ]);