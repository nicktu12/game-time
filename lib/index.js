const Block = require('./Blocks.js');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var block = new Block();

var buildAnArray = block.buildArray();
block.buildBlocks(buildAnArray, context);
