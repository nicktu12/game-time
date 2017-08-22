class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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

  initiateVelocity () {
    if  (this.moveX === 0) {
      this.moveX = 2;
      this.moveY = -2;
    }
  }

  resetBall() {
    this.moveX = 0;
    this.moveY = 0;
  }

  // refactor to create move method

  bounceWalls(canvasWidth) {
    if (this.x + 6 >= canvasWidth) {
      this.moveX = -this.moveX;
    } else if (this.x - 6 <= 0) {
      this.moveX = -this.moveX;
    } else if (this.y - 6 <= 0) {
      this.moveY = -this.moveY;
    }
  }


  bouncePaddleY(paddle) {
    let paddleRight = paddle.x + 50;
    let paddleLeft = paddle.x;

    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleRight) {
      if (this.moveY > 4 || this.moveY < -4) {
        this.moveY = -this.moveY;
      } else {
        this.moveY = -this.moveY * 1.1;
      }
    }

  }

  bouncePaddleModulation(paddle) {
    let paddleRight = paddle.x + 50;
    let paddleLeft = paddle.x;

    if (this.y === paddle.y - 6 && this.x > paddleLeft + 30 && this.x < paddleLeft + 40) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX < 0) {
          this.moveX = this.moveX * .9;
        } else {
          this.moveX = this.moveX * 1.1;
        }
      }
    }

    if (this.y === paddle.y - 6 && this.x > paddleLeft + 40 && this.x < paddleRight) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX < 0) {
          this.moveX = this.moveX * .7;
        } else {
          this.moveX = this.moveX * 1.3;
        }
      }
    }

    if (this.y === paddle.y - 6 && this.x > paddleLeft + 10 && this.x < paddleLeft + 20) {
      if (this.moveX < 4 || this.moveX > -4) {
        if (this.moveX > 0) {
          this.moveX = this.moveX * .9;
        } else {
          this.moveX = this.moveX * 1.1;
        }
      }
    }

    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleLeft + 10) {
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
  }

  fastBall() {
    this.moveX = this.moveX * 2;
    this.moveY = this.moveY * 2;
  }

}

module.exports = Ball;
