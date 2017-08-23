var { assert } = require('chai');

var Block = require('../lib/Block.js');
var Ball = require('../lib/Ball.js');


describe('block unit testing', () => {
  it('should be a function', () => {
    let block = new Block();
  })

  it('should have a fixed width and height', () => {
    let block = new Block();

    assert.equal(block.height === 10, true);
    assert.equal(block.width === 50, true);
  })

  it('should build an array', () => {
    let block = new Block();
    let blockArray = block.buildLevelOne();

    assert.equal(Array.isArray(blockArray), true);
  })

  it('should build an array of 24 blocks', () => {
    let block = new Block();
    let blockArray = block.buildLevelTwo();

    assert.equal(blockArray.length, 24);
  })

  it('should reverse direction of ball when colliding', () => {
    let block = new Block();
    let ball = new Ball();
    let blockArray = block.buildLevelOne();

    ball.initiateVelocity();
    assert.equal(ball.moveY === -2, true);
    block.breakBlock(blockArray, ball);
    assert.equal(ball.moveY === -2, true);
  })

})
