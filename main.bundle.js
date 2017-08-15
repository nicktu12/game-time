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

	const Block = __webpack_require__(1);
	const Paddle = __webpack_require__(2);

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');

	var block = new Block();

	var buildAnArray = block.buildArray();
	block.buildBlocks(buildAnArray, context);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	class Blocks {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.width = 50;
	    this.height = 10;
	  }

	  draw(context) {
	    context.fillStyle = 'pink';
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  buildArray() {
	    let blockArray = [];
	    for (var i = 0; i < 24; i++) {
	      var x = 6.25 + i % 8 * 50 * 1.25;
	      var y = 6.25 + i % 3 * 10 * 2.25;
	      blockArray.push(new Blocks(x, y));
	    }
	    return blockArray;
	  }

	  buildBlocks(array, context) {
	    for (var i = 0; i < array.length; i++) {
	      array[i].draw(context);
	    }
	  }
	}

	module.exports = Blocks;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	console.log('paddle yo');

	module.exports = Paddle;

/***/ })
/******/ ]);