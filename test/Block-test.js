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
    let blockArray = [];

    assert.notEqual(blockArray.length, 24)
    blockArray = block.buildLevelTwo();
    assert.equal(blockArray.length, 24);
  })

  it('should reverse direction of ball when colliding', () => {
    let block = new Block(10, 10);
    let ball = new Ball(30, 30);
    let blockArray = block.buildLevelOne();

    ball.initiateVelocity();
    assert.equal(ball.moveY === -2, true);
    ball.x = 20;
    ball.y = 26;
    block.breakBlock(blockArray, ball);
    assert.equal(ball.moveY === 2, true);
  })

  it('should create 3 special blocks for level one', () => {
    let block = new Block();
    let blockArray = [];

    blockArray = block.buildLevelOne();
    assert.equal(blockArray[0].special, true);
    assert.equal(blockArray[1].special, true);
    assert.equal(blockArray[2].special, true);
    assert.equal(blockArray[3].special, false);
  })

  it('should be able to break when hit by ball', () => {
    let block = new Block(10, 10);
    let ball = new Ball(30, 30);
    let blockArray = block.buildLevelOne();

    ball.initiateVelocity();
    assert.equal(blockArray.length, 24);
    ball.x = 20;
    ball.y = 26;
    block.breakBlock(blockArray, ball);
    assert.equal(blockArray.length, 23);
  })

})
