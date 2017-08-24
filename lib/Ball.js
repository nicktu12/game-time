const GamePiece = require('./GamePiece');

class Ball extends GamePiece {

  constructor(x, y) {
    super(x, y);
    this.width = 6;
    this.height = 6;
    this.moveX = 0;
    this.moveY = -0;
  }

  draw(context, paddle) {
    context.beginPath();
    context.arc(this.x, this.y, 6, 0, Math.PI * 2);
    context.fillStyle = '#FFFF33';
    context.fill();
    context.closePath();
    if (this.moveX === 0) {
      this.x = paddle.x + 35;
      this.y = paddle.y - 6;
    } else {
      this.x += this.moveX;
      this.y += this.moveY;
    }
  }

  initiateVelocity() {
    if  (this.moveX === 0) {
      this.moveX = this.moveX + 2;
      this.moveY = this.moveY - 2;
    }
  }

  resetBall() {
    this.moveX = 0;
    this.moveY = 0;
  }

  bounceWalls(canvasWidth) {
    let bounceWallSound = document.getElementById('wall-bounce');
    bounceWallSound.volume = .1;

    if (this.x + 6 >= canvasWidth) {
      this.moveX = -this.moveX;
      bounceWallSound.play();
    } else if (this.x - 6 <= 0) {
      this.moveX = -this.moveX;
      bounceWallSound.play();
    } else if (this.y - 6 <= 0) {
      this.moveY = -this.moveY;
      bounceWallSound.play();
    }

  }

  bouncePaddleY(paddle) {
    let paddleRight = paddle.x + paddle.width;
    let paddleLeft = paddle.x;

    if (this.y >= paddle.y - 6 && this.x + 6 >= paddleLeft && this.x - 6 <= paddleRight) {
      if (this.moveY > 4 || this.moveY < -4) {
        this.moveY = -this.moveY;
        if (this.moveY !== 0) {
          document.getElementById('unbreakable-bounce-sound').volume = .3;
          document.getElementById('unbreakable-bounce-sound').play();
        }
      } else {
        this.moveY = -this.moveY * 1.1;
        if (this.moveY !== 0) {
          document.getElementById('unbreakable-bounce-sound').volume = .3;
          document.getElementById('unbreakable-bounce-sound').play();
        }
      }
    }

  }

  bouncePaddleModulation(paddle) {
    let paddleRight = paddle.x + paddle.width;
    let paddleLeft = paddle.x;
    let paddleQuintent = (paddle.width / 5)

    if (this.y === paddle.y - 6 && this.x + 6 >= paddleLeft + (paddleQuintent * 3) && this.x - 6 <= paddleLeft + (paddleQuintent * 4)) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX < 0) {
          this.moveX = this.moveX * .9;
        } else {
          this.moveX = this.moveX * 1.1;
        }
      }
    }

    if (this.y === paddle.y - 6 && this.x + 6 >= paddleLeft + (paddleQuintent * 4) && this.x - 6 <= paddleRight) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX < 0) {
          this.moveX = this.moveX * .7;
        } else {
          this.moveX = this.moveX * 1.3;
        }
      }
    }

    if (this.y === paddle.y - 6 && this.x >= paddleLeft + (paddleQuintent * 1) && this.x <= paddleLeft + (paddleQuintent * 2)) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX > 0) {
          this.moveX = this.moveX * .9;
        } else {
          this.moveX = this.moveX * 1.1;
        }
      }
    }

    if (this.y === paddle.y - 6 && this.x >= paddleLeft && this.x <= paddleLeft + 10) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX > 0) {
          this.moveX = this.moveX * .7;
        } else {
          this.moveX = this.moveX * 1.3;
        }
      }
    }
  }

  slowBall() {
    this.moveX = this.moveX / 2;
    this.moveY = this.moveY / 2;
    console.log(this.moveX, this.moveY);
  }

  fastBall() {
    this.moveX = this.moveX * 2;
    this.moveY = this.moveY * 2;
    console.log(this.moveX, this.moveY);

  }

}

module.exports = Ball;
