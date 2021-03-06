const Powerup = require('./Powerup.js');
const GamePiece = require('./GamePiece.js');

class Block extends GamePiece {

  constructor(x, y, special = false, unbreakable = false) {
    super(x, y);
    this.width = 50;
    this.height = 10;
    this.special = special;
    this.unbreakable = unbreakable;
  }

  draw(context) {
    if (this.special === true) {
      context.fillStyle = '#99ff66';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.buildTrapezoid(context, this.x, this.y, this.x + 2, this.y + 2, this.x + 2, this.y + 8, this.x, this.y + 10, '#84e155');
      this.buildTrapezoid(context, this.x + 48, this.y + 2, this.x + 50, this.y, this.x + 50, this.y + 10, this.x + 48, this.y + 8, '#84e155');
      this.buildTrapezoid(context, this.x, this.y, this.x + 50, this.y, this.x + 48, this.y + 2, this.x + 2, this.y + 2, '#66a547');
      this.buildTrapezoid(context, this.x + 2, this.y + 8, this.x + 48, this.y + 8, this.x + 50, this.y + 10, this.x, this.y + 10, '#66a547');
    } else if (this.unbreakable === true) {
      context.fillStyle = '#efecf0';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.buildTrapezoid(context, this.x, this.y, this.x + 2, this.y + 2, this.x + 2, this.y + 8, this.x, this.y + 10, '#dcd9dc');
      this.buildTrapezoid(context, this.x + 48, this.y + 2, this.x + 50, this.y, this.x + 50, this.y + 10, this.x + 48, this.y + 8, '#dcd9dc');
      this.buildTrapezoid(context, this.x, this.y, this.x + 50, this.y, this.x + 48, this.y + 2, this.x + 2, this.y + 2, '#a5a3a5');
      this.buildTrapezoid(context, this.x + 2, this.y + 8, this.x + 48, this.y + 8, this.x + 50, this.y + 10, this.x, this.y + 10, '#a5a3a5');
    } else {
      context.fillStyle = '#fa47c9';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.buildTrapezoid(context, this.x, this.y, this.x + 2, this.y + 2, this.x + 2, this.y + 8, this.x, this.y + 10, '#fa39c5');
      this.buildTrapezoid(context, this.x + 48, this.y + 2, this.x + 50, this.y, this.x + 50, this.y + 10, this.x + 48, this.y + 8, '#fa39c5');
      this.buildTrapezoid(context, this.x, this.y, this.x + 50, this.y, this.x + 48, this.y + 2, this.x + 2, this.y + 2, '#ab318b');
      this.buildTrapezoid(context, this.x + 2, this.y + 8, this.x + 48, this.y + 8, this.x + 50, this.y + 10, this.x, this.y + 10, '#ab318b');
    }
  }

  buildTrapezoid(context, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  }

  randomSpecialBlocks(arr, numOfSpecialBlocks) {
    let buffer = [], start;

    for (let i = arr.length; i >= arr.length && i > 0; i--) {
      start = Math.floor(Math.random() * arr.length);
      buffer.push(arr.splice(start, 1)[0]);
    }

    this.assignSpecialBlocks(buffer, numOfSpecialBlocks);
    return buffer;
  }

  assignSpecialBlocks(array, number) {
    for (var i = 0; i < number; i++) {
      if (array[i].unbreakable === false) {
        array[i].special = true;
      }
    }
  }

  buildLevelOne() {
    let levelOneArray = [];

    for (let i = 0; i < 24; i++) {
      this.x = 6.25 + ((i % 8) * 50) * 1.25;
      this.y = 6 + ((i % 3) * 10) * 2;
      levelOneArray.push(new Block(this.x, this.y));
    }

    levelOneArray = this.randomSpecialBlocks(levelOneArray, 3);
    return levelOneArray;
  }

  buildLevelTwo() {
    let levelTwoArray = [];

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

    levelTwoArray = this.randomSpecialBlocks(levelTwoArray, 5);
    return levelTwoArray;
  }

  buildLevelThree() {
    let levelThreeArray = [];

    for (let i = 0; i < 6; i++) {
      this.x = 193.75 + ((i % 2) * 50) * 1.25;
      this.y = 125 + ((i % 3) * 10) * 2;
      levelThreeArray.push(new Block(this.x, this.y));
    }

    for (var i = 0; i < 1; i++) {
      levelThreeArray[i].special = true;
    }

    levelThreeArray = this.randomSpecialBlocks(levelThreeArray, 0);
    return levelThreeArray;
  }

  buildLevelFour() {
    let levelFourArray = [];

    for (let i = 0; i < 12; i++) {
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

    for (let i = 0; i < 12; i++) {
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

    for (let i = 0; i < 12; i++) {
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

    for (let i = 0; i < 12; i++) {
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

    for (let i = 0; i < 12; i++) {
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

    levelFourArray = this.randomSpecialBlocks(levelFourArray, 7);
    return levelFourArray;
  }

  buildBlock(array, context) {
    for (let i = 0; i < array.length; i++) {
      array[i].draw(context);
    }
  }

  breakBlock(array, ball, game, powerupArray) {
    for (let i = 0; i < array.length; i++) {
      if (ball.y + ball.radius >= array[i].y &&
          ball.y - ball.radius <= array[i].y + array[i].height &&
          ball.x - ball.radius <= array[i].x + array[i].width &&
          ball.x + ball.radius >= array[i].x) {
        this.whatSide(array[i], ball, 4)
        // ball.moveY = -ball.moveY;
        if (array[i].unbreakable === false) {
          game.points += 10;
          this.updatePointsInfoBar(game);
          document.getElementById('normal-bounce-sound').volume = 0.5;
          document.getElementById('normal-bounce-sound').play();
        } else {
          document.getElementById('unbreakable-bounce-sound').volume = 0.5;
          document.getElementById('unbreakable-bounce-sound').play();
          return;
        }

        if (array[i].special === true) {
          powerupArray.push(new Powerup(array[i].x + 5, array[i].y));
          game.points += 15;
          this.updatePointsInfoBar(game);
          document.getElementById('special-bounce-sound').volume = 0.8;
          document.getElementById('special-bounce-sound').play();
        }

        array.splice(i, 1);
      }
    }
  }

  whatSide(array, ball, buffer) {
    if (ball.x <= array.x
        && ball.y >= array.y - buffer
        && ball.y <= array.y + array.height + buffer) {
          // if (ball.y <= array.y
          //     && ball.x >= array.x - 6
          //     && ball.x <= array.x + array.width + buffer) {
          //   console.log('left & top')
          //   ball.moveY = -ball.moveY;
          //   ball.moveX = -ball.moveX;
          //   return;
          // }
          // if (ball.y <= array.y + array.height
          //     && ball.x >= array.x - 6
          //     && ball.x <= array.x + array.width + buffer) {
          //   console.log('left & bottom')
          //   ball.moveY = -ball.moveY;
          //   ball.moveX = -ball.moveX;
          //   return;
          // }
      console.log('left');
      ball.moveX = -ball.moveX;
    }
    if (ball.x >= array.x + array.width
        && ball.y >= array.y - 6
        && ball.y <= array.y + array.height + buffer) {
      // if (ball.y <= array.y
      //     && ball.x >= array.x - 6
      //     && ball.x <= array.x + array.width + buffer) {
      //   console.log('right & top')
      //   ball.moveY = -ball.moveY;
      //   ball.moveX = -ball.moveX;
      //   return;
      //   }
      // if (ball.y <= array.y + array.height
      //     && ball.x >= array.x - 6
      //     && ball.x <= array.x + array.width + buffer) {
      //   console.log('right & bottom')
      //   ball.moveY = -ball.moveY;
      //   ball.moveX = -ball.moveX;
      //   return;
      //   }
      console.log('right');
      ball.moveX = -ball.moveX;
    }
    if (ball.y <= array.y
        && ball.x >= array.x - 6
        && ball.x <= array.x + array.width + buffer) {
      ball.moveY = -ball.moveY;
      console.log('top');
    }
    if (ball.y >= array.y + array.height
        && ball.x >= array.x - 6
        && ball.x <= array.x + array.width + buffer) {
      ball.moveY = -ball.moveY;
      console.log('bottom');
    }
  }

  bulletBlock(blockArray, bulletArray, powerupArray, game) {
    for (var i = 0; i < blockArray.length; i++) {
      for (var j = 0; j < bulletArray.length; j++) {
        if (bulletArray[j].y + bulletArray[j].radius >= blockArray[i].y
            && bulletArray[j].y - bulletArray[j].radius <= blockArray[i].y + blockArray[i].height
            && bulletArray[j].x - bulletArray[j].radius <= blockArray[i].x + blockArray[i].width
            && bulletArray[j].x + bulletArray[j].radius >= blockArray[i].x) {
          if (blockArray[i].special === true) {
            console.log(i);
            powerupArray.push(new Powerup(blockArray[i].x + 5, blockArray[i].y));
            game.points += 15;
            this.updatePointsInfoBar(game);
            document.getElementById('special-bounce-sound').volume = 0.8;
            document.getElementById('special-bounce-sound').play();
            blockArray.splice(i, 1);
            bulletArray[j].y = -100;
          } else if (blockArray[i].unbreakable === false) {
            game.points += 10;
            this.updatePointsInfoBar(game);
            document.getElementById('normal-bounce-sound').volume = 0.5;
            document.getElementById('normal-bounce-sound').play();
            blockArray.splice(i, 1);
            bulletArray[j].y = -100;
          } else {
            bulletArray[j].y = -100;
          }
        }
      }
    }
  }

  updatePointsInfoBar(game) {
    let pointsInfoBar = document.getElementById('points');
    pointsInfoBar.innerHTML = `Points: ${game.points}`;
  }

}


module.exports = Block;
