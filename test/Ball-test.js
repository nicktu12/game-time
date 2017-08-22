var { assert, expect, should } = require('chai');

var Ball = require('../lib/Ball.js');
var Paddle = require('../lib/Paddle.js');
var Block = require('../lib/Block.js')


describe('ball unit testing', function() {
  it('should be a function', function() {
    var ball = new Ball();
  })

  it('should have a fixed diameter', function() {
    var ball = new Ball();
    
    assert.equal(ball.width, 8);
    assert.equal(ball.height, 8);
  })

  it('should not have a speed initially', function() {
    var ball = new Ball();

    assert.equal(ball.moveX === 0, true);
    assert.equal(ball.moveY === 0, true);
  })

  it('should start moving', () => {
    var ball = new Ball();

    assert.equal(ball.moveX === 0, true);
    assert.equal(ball.moveY === 0, true);
    ball.initiateVelocity();
    assert.equal(ball.moveX !== 0, true);
    assert.equal(ball.moveY !== 0, true);
  })

  it('should bounce off the right wall', function() {
    var ball = new Ball(496);

    assert.equal(ball.moveX >= 0, true)
    ball.bounceWalls();
    assert.equal(ball.moveX <= 0, true);
  })

  it('should bounce off the left wall', function() {
    var ball = new Ball(4);

    assert.equal(ball.moveX <= 0, true)
    ball.bounceWalls();
    assert.equal(ball.moveX >= 0, true);
  })

  it('should bounce off the ceiling', function() {
    var ball = new Ball(this.x, 4);

    assert.equal(ball.moveY <= 0, true)
    ball.bounceWalls();
    assert.equal(ball.moveY >= 0, true);
  })

  it('should speed up vertically when it bounces off paddle', () => {
    var ball = new Ball(100, 100);
    var paddle = new Paddle(225, 476);

    ball.initiateVelocity();
    assert.equal(ball.moveY === -2, true);
    ball.y = paddle.y - 8;
    ball.x = paddle.x + 25;
    ball.bouncePaddleY(paddle);
    assert.equal(ball.moveY >= 2, true);
  })

  it('should change angle when bounce of sides of paddle', () => {
    var ball = new Ball(100, 100);
    var paddle = new Paddle(225, 476);

    ball.initiateVelocity();
    assert.equal(ball.moveX === 2, true);
    ball.y = paddle.y - 8;
    ball.x = paddle.x + 31;
    ball.bouncePaddleModulation(paddle);
    assert.equal(ball.moveX > 2, true);

    ball.moveX = 2;
    ball.x = paddle.x + 11;
    ball.bouncePaddleModulation(paddle);
    assert.equal(ball.moveX < 2, true);
  })

  it('should bounce off bricks', () => {
    var ball = new Ball(300, 300);
    var block = new Block(10, 10);
    var array = [block];

    ball.initiateVelocity();
    assert.equal(ball.moveY < 0, true);
    ball.x = 11;
    ball.y = 28;
    block.breakBlock(array, ball);
    assert.equal(ball.moveY > 0, true);
  })

  it.skip('stop when leveled up', () => {

  })

  it('break bricks on collision', () => {
    var ball = new Ball(300, 300);
    var block = new Block(10, 10);
    var array = [block];

    ball.initiateVelocity();
    assert.equal(array.length, 1);
    ball.x = 11;
    ball.y = 28;
    block.breakBlock(array, ball);
    assert.equal(array.length, 0);
  })

})
