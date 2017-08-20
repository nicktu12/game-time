class Blocks {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 10;
    this.status = 1;
  }

  draw(context) {
    context.fillStyle = 'pink';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  buildLevelOne() {
    let levelOneArray = [];
    for (var i = 0; i < 24; i++) {
      this.x = 6.25 + ((i % 8) * 50) * 1.25;
      this.y = 6 + ((i % 3) * 10) * 2 ;
      levelOneArray.push(new Blocks(this.x, this.y));
    }
    return levelOneArray;
  }

  buildLevelTwo() {
    let levelTwoArray = [];

    for (var i = 0; i < 12; i++) {
      this.x = 6.25 + ((i % 3) * 50) * 1.25;
      this.y = 6 + ((i % 4) * 10) * 2 ;
      levelTwoArray.push(new Blocks(this.x, this.y));
    }

    for (var i = 0; i < 12; i++) {
      this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
      this.y = 6 + ((i % 4) * 10) * 2 ;
      levelTwoArray.push(new Blocks(this.x, this.y));
    }

    return levelTwoArray;
  }

  buildLevelThree(context) {
    let levelThreeArray = [];

    for (var i = 0; i < 24; i++) {
      this.x = 193.75 + ((i % 2) * 50) * 1.25;
      this.y = 125 + ((i % 3) * 10) * 2 ;
      levelThreeArray.push(new Blocks(this.x, this.y));
    }

    return levelThreeArray;
  }

  buildLevelFour() {
    let levelFourArray = [];

    for (var i = 0; i < 12; i++) {
      this.x = 6.25 + ((i % 3) * 50) * 1.25;
      this.y = 6 + ((i % 4) * 10) * 2;
      levelFourArray.push(new Blocks(this.x, this.y));
    }

    for (var i = 0; i < 12; i++) {
      this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
      this.y = 6 + ((i % 4) * 10) * 2;
      levelFourArray.push(new Blocks(this.x, this.y));
    }

    for (var i = 0; i < 12; i++) {
      this.x = 156.25 + (6.25 + ((i % 3) * 50) * 1.25);
      this.y = 88 + (6 + ((i % 4) * 10) * 2);
      levelFourArray.push(new Blocks(this.x, this.y));
    }

    for (var i = 0; i < 12; i++) {
      this.x = 6.25 + ((i % 3) * 50) * 1.25;
      this.y = 172 + (6 + ((i % 4) * 10) * 2);
      levelFourArray.push(new Blocks(this.x, this.y));
    }

    for (var i = 0; i < 12; i++) {
      this.x = 312.5 + (6.25 + ((i % 3) * 50) * 1.25);
      this.y = 172 + (6 + ((i % 4) * 10) * 2);
      levelFourArray.push(new Blocks(this.x, this.y));
    }

    return levelFourArray;

  }

  buildBlocks(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].draw(context);
      //assign each block it's own status of 1
    }
  }

  buildBlocksLevelThree(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].drawSmall(context);
    }
  }

  breakBlocks(array, ball, game) {
    for (var i = 0; i < array.length; i++) {
      if (ball.y + 4 >= array[i].y && ball.y - 4 <= array[i].y + 10 && ball.x <= array[i].x + 50 && ball.x >= array[i].x) {
        ball.moveY = -ball.moveY;
        //console.log(status);

        // if (game.currentLevel === 3) {
        //   this.status--;
        // }
        // console.log(this.status);
        array.splice(i, 1);
      }
    }
  }

  blockStatus(context) {
    if (this.status === 0) {
      context.clearRect(this.x, this.y, this.width, this.height);
    }
  }
}


module.exports = Blocks;
