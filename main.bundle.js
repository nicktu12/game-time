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
	var ball = new Ball(canvas.width / 2, canvas.height - 50);

	var gamePieces = [block, paddle, ball];

	var buildAnArray = block.buildArray();

	function gameLoop() {
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

	document.addEventListener('keydown', function (e) {
	  if (e.keyCode === 39) {
	    paddle.moveRight();
	  } else if (e.keyCode === 37) {
	    paddle.moveLeft();
	  }
	});

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Blocks {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.width = 50;
	    this.height = 10;
	    this.status = 1;
	  }

	  draw(context) {
	    context.fillStyle = 'pink';
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  buildArray() {
	    let blockArray = [];
	    for (var i = 0; i < 24; i++) {
	      this.x = 6.25 + i % 8 * 50 * 1.25;
	      this.y = 6 + i % 3 * 10 * 2;
	      blockArray.push(new Blocks(this.x, this.y));
	    }
	    return blockArray;
	  }

	  // blockStatus(context) {
	  //   if (this.status === 0) {
	  //     context.clearRect(this.x, this.y, this.width, this.height);
	  //   }
	  // }

	  buildBlocks(array, context) {
	    for (var i = 0; i < array.length; i++) {
	      array[i].draw(context);
	    }
	  }

	  breakBlocks(array, ball) {
	    for (var i = 0; i < array.length; i++) {
	      if (ball.y - 4 === array[i].y + 10 && ball.x <= array[i].x + 25 && ball.x >= array[i].x) {
	        ball.moveY = -ball.moveY;
	        console.log("array id:", i, "array[i] coordinates: ", array[i].x, ",", array[i].y);
	        console.log("array id:", i, "ball coordinates: ", ball.x, ",", ball.y);
	        console.log("array id:", i, array[i]);
	        array.splice(i, 1);
	        console.log("array id:", i, "array length", array.length);
	      }
	    }
	  }

	}

	module.exports = Blocks;

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
	    context.fillStyle = 'red';
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  moveRight() {
	    if (this.x + 50 < 499) {
	      this.x += 7;
	    }
	  }

	  moveLeft() {
	    if (this.x > 1) {
	      this.x -= 7;
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
	    this.moveX = 2;
	    this.moveY = -2;
	  }

	  draw(context) {
	    context.beginPath();
	    context.arc(this.x, this.y, 8, 0, Math.PI * 2);
	    context.fillStyle = 'turquoise';
	    context.fill();
	    context.closePath();
	    this.x += this.moveX;
	    this.y += this.moveY;
	  }

	  // refactor to create move method

	  bounceWalls(canvasWidth) {
	    if (this.x + 4 === canvasWidth) {
	      this.moveX = -this.moveX;
	    } else if (this.x - 4 === 0) {
	      this.moveX = -this.moveX;
	    } else if (this.y - 4 === 0) {
	      this.moveY = -this.moveY;
	    }
	  }

	  bouncePaddle(paddle) {
	    let paddleRight = paddle.x + 50;
	    let paddleLeft = paddle.x;

	    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleRight) {
	      this.moveY = -this.moveY;
	    }
	  }

	}

	module.exports = Ball;

/***/ })
/******/ ]);