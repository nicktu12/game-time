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

  buildArray() {
    let blockArray = [];
    for (var i = 0; i < 24; i++) {
      this.x = 6.25 + ((i % 8) * 50) * 1.25;
      this.y = 6 + ((i % 3) * 10) * 2 ;
      blockArray.push(new Blocks(this.x, this.y));
    }
    return blockArray;
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

  breakBlocks(array, ball, context) {
    for (var i = 0; i < array.length; i++) {
      if (ball.y - 4 === array[i].y + 10) {
        this.status = 0;
        // this.blockStatus(context);
        ball.moveY = -ball.moveY;
        console.log(array[i])
        array.splice(array[i], 1);
      }
    }
  }
}

module.exports = Blocks;
