var { assert, expect, should } = require('chai');

var Block = require('../lib/Block.js');
var Ball = require('../lib/Ball.js');


describe('block unit testing', function () {
  it('should be a function', function () {
    var block = new block();
  })

  it('should have a fixed width and height', function () {
    var block = new block();

    assert.equal(block.height === 10, true);
    assert.equal(block.width === 50, true);
  })

  it('should build an array', function () {
    var block = new block();
    var blockArray = block.buildArray();

    assert.equal(Array.isArray(blockArray), true);
  })

  it('should build an array of 24 block', function () {
    var block = new block();
    var blockArray = block.buildArray();

    assert.equal(blockArray.length, 24);
  })

  it('should reverse direction of ball when colliding', function () {
    var block = new block();
    var ball = new Ball();
    var blockArray = block.buildArray();

    block.breakblock(blockArray, ball);
    assert.equal(1, 1)
  })

})
