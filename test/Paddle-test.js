var { assert, expect, should } = require('chai');

var Paddle = require('../lib/Paddle.js');

describe('paddle unit testing', function() {
  it('should be a function', function() {
    var paddle = new Paddle();
  })

  it('should move right', function() {
    var paddle = new Paddle(225, 476);
    let paddleX = paddle.x;
    paddle.moveRight();
    assert.equal(paddle.x === paddleX + 7, true)
  })

  it('should move left', function() {
    var paddle = new Paddle(225, 476);
    let paddleX = paddle.x;
    paddle.moveLeft();
    assert.equal(paddle.x === paddleX - 7, true)
  })

})
