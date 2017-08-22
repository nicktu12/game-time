class Block {
  constructor(x, y, special = false, unbreakable = false) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 10;
    this.status = 1;
    this.special = special;
    this.unbreakable = unbreakable;
  }

  draw(context) {
    if (this.special === true) {
      context.fillStyle = '#99FF66';
      context.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.unbreakable === true) {
      context.fillStyle = '#EFECF0';
      context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      context.fillStyle = '#FF0066';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }


  randomSpecialBlocks(arr) {
    var buffer = [], start;

    for (var i = arr.length; i >= arr.length && i > 0; i--) {
      start = Math.floor(Math.random() * arr.length);
      buffer.push(arr.splice(start, 1)[0])
    }

    return buffer;
  }

  buildLevelOne() {
    let levelOneArray = [];

    for (var i = 0; i < 24; i++) {
      this.x = 6.25 + ((i % 8) * 50) * 1.25;
      this.y = 6 + ((i % 3) * 10) * 2;
      levelOneArray.push(new Block(this.x, this.y));
    }
    // this.specialBlock(levelOneArray, 2);
    levelOneArray = this.randomSpecialBlocks(levelOneArray);
    levelOneArray[0].special = true;
    levelOneArray[1].special = true;
    return levelOneArray;

  }

  buildLevelTwo() {
    let levelTwoArray = [];

    for (var i = 0; i < 12; i++) {
      if (i === 7) {
        this.unbreakable = true;
        this.x = 6.25 + ((i % 3) * 50) * 1.25;
        this.y = 6 + ((i % 4) * 10) * 2 ;
        levelTwoArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 6.25 + ((i % 3) * 50) * 1.25;
        this.y = 6 + ((i % 4) * 10) * 2 ;
        levelTwoArray.push(new Block(this.x, this.y));
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i === 7) {
        this.unbreakable = true;
        this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 6 + ((i % 4) * 10) * 2 ;
        levelTwoArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 6 + ((i % 4) * 10) * 2 ;
        levelTwoArray.push(new Block(this.x, this.y));
      }
    }

    return levelTwoArray;
  }

  buildLevelThree(context) {
    let levelThreeArray = [];

    for (var i = 0; i < 24; i++) {
      this.x = 193.75 + ((i % 2) * 50) * 1.25;
      this.y = 125 + ((i % 3) * 10) * 2 ;
      levelThreeArray.push(new Block(this.x, this.y));
    }

    return levelThreeArray;
  }

  buildLevelFour() {
    let levelFourArray = [];

    for (var i = 0; i < 12; i++) {
      if (i === 11) {
        this.unbreakable = true;
        this.x = 6.25 + ((i % 3) * 50) * 1.25;
        this.y = 6 + ((i % 4) * 10) * 2;
        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 6.25 + ((i % 3) * 50) * 1.25;
        this.y = 6 + ((i % 4) * 10) * 2;
        levelFourArray.push(new Block(this.x, this.y));
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i === 3) {
        this.unbreakable = true;
        this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 6 + ((i % 4) * 10) * 2;
        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 6 + ((i % 4) * 10) * 2;
        levelFourArray.push(new Block(this.x, this.y));
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i === 7) {
        this.unbreakable = true;
        this.x = 156.25 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 88 + (6 + ((i % 4) * 10) * 2);
        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 156.25 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 88 + (6 + ((i % 4) * 10) * 2);
        levelFourArray.push(new Block(this.x, this.y));
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i === 3 || i === 11) {
        this.unbreakable = true;
        this.x = 6.25 + ((i % 3) * 50) * 1.25;
        this.y = 172 + (6 + ((i % 4) * 10) * 2);
        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 6.25 + ((i % 3) * 50) * 1.25;
        this.y = 172 + (6 + ((i % 4) * 10) * 2);
        levelFourArray.push(new Block(this.x, this.y));
      }
    }

    for (var i = 0; i < 12; i++) {
      if (i === 3 || i === 11) {
        this.unbreakable = true;
        this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 172 + (6 + ((i % 4) * 10) * 2);
        levelFourArray.push(new Block(this.x, this.y, false, this.unbreakable));
      } else {
        this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
        this.y = 172 + (6 + ((i % 4) * 10) * 2);
        levelFourArray.push(new Block(this.x, this.y));
      }
    }

    return levelFourArray;

  }

  buildBlock(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].draw(context);
      //assign each block it's own status of 1
    }
  }

  // buildblockLevelThree(array, context) {
  //   for (var i = 0; i < array.length; i++) {
  //     array[i].drawSmall(context);
  //   }
  // }

  breakBlock(array, ball) {
    for (var i = 0; i < array.length; i++) {
      if (ball.y + 6 >= array[i].y && ball.y - 6 <= array[i].y + 10 && ball.x <= array[i].x + 50 && ball.x >= array[i].x) {
        ball.moveY = -ball.moveY;
        if (array[i].unbreakable === true) {
          return;
        };
        array.splice(i, 1);
      }
    }
  }
}


module.exports = Block;
