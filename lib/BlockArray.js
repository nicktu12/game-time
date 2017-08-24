class BlockArray {

  constructor(level) {
    this.level = level;
  }

  buildLevel() {
    let levelArray = [];

    for (var i = 0; i < array.length; i++) {
      array[i]
    }
  }

}

for (let i = 0; i < 24; i++) {
  this.x = 6.25 + ((i % 8) * 50) * 1.25;
  this.y = 6 + ((i % 3) * 10) * 2;
  levelOneArray.push(new Block(this.x, this.y));
}

for (let i = 0; i < 12; i++) {
  if (i === 7) {
    this.unbreakable = true;
    this.x = 6.25 + ((i % 3) * 50) * 1.25;
    this.y = 6 + ((i % 4) * 10) * 2;
    levelTwoArray.push(new Block(this.x, this.y, false, this.unbreakable));
  } else {
    this.x = 6.25 + ((i % 3) * 50) * 1.25;
    this.y = 6 + ((i % 4) * 10) * 2;
    levelTwoArray.push(new Block(this.x, this.y));
  }
}

for (let i = 0; i < 12; i++) {
  if (i === 7) {
    this.unbreakable = true;
    this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
    this.y = 6 + ((i % 4) * 10) * 2;
    levelTwoArray.push(new Block(this.x, this.y, false, this.unbreakable));
  } else {
    this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
    this.y = 6 + ((i % 4) * 10) * 2;
    levelTwoArray.push(new Block(this.x, this.y));
  }
}
return levelTwoArray;


function (numberOfBlocksForThisSpecificArray, block, leftPadding, topPadding, column, row) {
  let array = [];

  for (var i = 0; i < numberOfBlocksForThisSpecificArray; i++) {
    block.x = leftPadding + ((i % column) * 50) * 1.25;
    block.y = topPadding + ((i % row) * 10) * 2;
    array.push(new Block(block.x, block.y))
  }
}
