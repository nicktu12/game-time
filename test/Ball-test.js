const { assert } = require('chai');

const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js');
const Block = require('../lib/Block.js')


describe('ball unit testing', () => {
  it('should be a function', () => {
    let ball = new Ball();
  })

  it('should have a fixed diameter', () => {
    let ball = new Ball();

    assert.equal(ball.width, 6);
    assert.equal(ball.height, 6);
  })

  it('should not have a speed initially', () => {
    let ball = new Ball();

    assert.equal(ball.moveX === 0, true);
    assert.equal(ball.moveY === 0, true);
  })

  it('should start moving', () => {
    let ball = new Ball();

    assert.equal(ball.moveX === 0, true);
    assert.equal(ball.moveY === 0, true);
    ball.initiateVelocity();
    assert.equal(ball.moveX !== 0, true);
    assert.equal(ball.moveY !== 0, true);
  })

  it('should bounce off the right wall', () => {
    let ball = new Ball(496);

    assert.equal(ball.moveX >= 0, true)
    ball.bounceWalls();
    assert.equal(ball.moveX <= 0, true);
  })

  it('should bounce off the left wall', () => {
    let ball = new Ball(4);

    assert.equal(ball.moveX <= 0, true)
    ball.bounceWalls();
    assert.equal(ball.moveX >= 0, true);
  })

  it('should bounce off the ceiling', () => {
    let ball = new Ball(this.x, 4);

    assert.equal(ball.moveY <= 0, true)
    ball.bounceWalls();
    assert.equal(ball.moveY >= 0, true);
  })

  it('should speed up vertically when it bounces off paddle', () => {
    let ball = new Ball(100, 100);
    let paddle = new Paddle(225, 476);

    ball.initiateVelocity();
    assert.equal(ball.moveY === -2, true);
    ball.y = paddle.y - 6;
    ball.x = paddle.x + 25;
    ball.bouncePaddleY(paddle);
    assert.equal(ball.moveY >= 2, true);
  })

  it('should change angle when bounce of sides of paddle', () => {
    let ball = new Ball(100, 100);
    let paddle = new Paddle(225, 476);

    ball.initiateVelocity();
    assert.equal(ball.moveX === 2, true);
    ball.y = paddle.y - 6;
    ball.x = paddle.x + 31;
    ball.bouncePaddleModulation(paddle);
    assert.equal(ball.moveX > 2, true);

    ball.moveX = 2;
    ball.x = paddle.x + 11;
    ball.bouncePaddleModulation(paddle);
    assert.equal(ball.moveX < 2, true);
  })

  it('should bounce off bricks', () => {
    let ball = new Ball(300, 300);
    let block = new Block(10, 10);
    let array = [block];

    ball.initiateVelocity();
    assert.equal(ball.moveY < 0, true);
    ball.x = 11;
    ball.y = 26;
    block.breakBlock(array, ball);
    assert.equal(ball.moveY > 0, true);
  })

  it('should set velocity to 0 when leveled up', () => {
    let ball = new Ball(300, 300);

    ball.initiateVelocity();
    assert.equal(ball.moveY === 0, false);
    ball.resetBall();
    assert.equal(ball.moveY === 0, true);
  })

  it('break bricks on collision', () => {
    let ball = new Ball(300, 300);
    let block = new Block(10, 10);
    let array = [block];

    ball.initiateVelocity();
    assert.equal(array.length, 1);
    ball.x = 11;
    ball.y = 26;
    block.breakBlock(array, ball);
    assert.equal(array.length, 0);
  })

})
