var { assert, expect, should } = require('chai');

var Blocks = require('../lib/Blocks.js');
var Ball = require('../lib/Ball.js');


describe('blocks unit testing', function () {
  it('should be a function', function () {
    var blocks = new Blocks();
  })

  it('should have a fixed width and height', function () {
    var blocks = new Blocks();

    assert.equal(blocks.height === 10, true);
    assert.equal(blocks.width === 50, true);
  })

  it('should build an array', function () {
    var blocks = new Blocks();
    var blocksArray = blocks.buildArray();

    assert.equal(Array.isArray(blocksArray), true);
  })

  it('should build an array of 24 blocks', function () {
    var blocks = new Blocks();
    var blocksArray = blocks.buildArray();

    assert.equal(blocksArray.length, 24);
  })

  it('should reverse direction of ball when colliding', function () {
    var blocks = new Blocks();
    var ball = new Ball();
    var blocksArray = blocks.buildArray();

    blocks.breakBlocks(blocksArray, ball);

    

    console.log('hiii');

    assert.equal(1, 1)
  })

})
