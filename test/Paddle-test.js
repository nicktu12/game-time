var { assert, expect, should } = require('chai');

var Paddle = require('../lib/Paddle.js');

describe('paddle unit testing', () => {
  it('should be a function', () => {
    var paddle = new Paddle();
  })

  it('should move right', () => {
    var paddle = new Paddle(225, 476);
    let paddleX = paddle.x;
    assert.equal(paddleX === 225, true);
    paddle.moveRight();
    assert.equal(paddle.x === paddleX + 10, true)
  })

  it('should move left', () => {
    var paddle = new Paddle(225, 476);
    let paddleX = paddle.x;
    assert.equal(paddleX === 225, true);
    paddle.moveLeft();
    assert.equal(paddle.x === paddleX - 10, true)
  })

  it('should not be able to go off the right side of the canvas', () => {
    var paddle = new Paddle(440, 476);
    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + 50;
    assert.equal(paddleRight < 500, true);
    paddle.moveRight();
    assert.equal(paddleRight < 500, true);
  })

  it('should not be able to go off the left side of the canvas', () => {
    var paddle = new Paddle(5, 476);
    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + 50;
    assert.equal(paddleLeft > 0, true);
    paddle.moveLeft();
    assert.equal(paddleLeft > 0, true);
  })

})
