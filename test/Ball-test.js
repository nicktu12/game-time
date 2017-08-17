var { assert, expect, should } = require('chai');
var jsdom = require('mocha-jsdom');

var Ball = require('../lib/Ball.js');
var Paddle = require('../lib/Paddle.js');

describe('ball unit testing', function() {
  it('should be a function', function() {
    var ball = new Ball();

  })

  it('should have a fixed diameter', function() {
    var ball = new Ball();
    assert.equal(ball.width, 8);
    assert.equal(ball.height, 8);
  })

  it('should have a speed', function() {
    var ball = new Ball();
    assert.equal(ball.moveX !== 0, true);
    assert.equal(ball.moveY !== 0, true);
  })

  it('should bounce off the right wall', function() {
    var ball = new Ball(496);
    let initialMoveX = ball.moveX;
    ball.bounceWalls(500);
    assert.equal(ball.moveX === -initialMoveX, true);
  })

  it('should bounce off the left wall', function() {
    var ball = new Ball(4);
    let initialMoveX = ball.moveX;
    ball.bounceWalls();
    assert.equal(ball.moveX === -initialMoveX, true);
  })

  it('should bounce off the ceiling', function() {
    var ball = new Ball(this.x, 4);
    let initialMoveY = ball.moveY;
    ball.bounceWalls();
    assert.equal(ball.moveY === -initialMoveY, true);
  })

  it('should bounce off of the paddle', function() {
    var ball = new Ball(250, 470);
    var paddle = new Paddle(225, 476);
    let initialMoveY = ball.moveY;
    ball.bouncePaddle(paddle);
    assert.equal(ball.moveY === -initialMoveY, true)
  })

})
