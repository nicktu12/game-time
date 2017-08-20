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

  buildLevelThree() {
    let levelThreeArray = [];

    for (var i = 0; i < 12; i++) {
      this.x = 6.25 + ((i % 2) * 50) * 1.25;
      this.y = 6 + ((i % 6) * 10) * 2 ;
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

  // blockStatus(context) {
  //   if (this.status === 0) {
  //     context.clearRect(this.x, this.y, this.width, this.height);
  //   }
  // }

  buildBlocks(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].draw(context);
    }
  }

  breakBlocks(array, ball) {
    for (var i = 0; i < array.length; i++) {
      if (ball.y + 4 >= array[i].y && ball.y - 4 <= array[i].y + 10 && ball.x <= array[i].x + 50 && ball.x >= array[i].x) {
        ball.moveY = -ball.moveY;
        array.splice(i, 1);
      }
    }
  }


}

module.exports = Blocks;
