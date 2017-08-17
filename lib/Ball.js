class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 50;
    this.width = 8;
    this.height = 8;
    this.moveX = 2;
    this.moveY = -2;
  }

  // do we need to define this.width and this.height in constructor?

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 8, 0, Math.PI*2);
    context.fillStyle = 'turquoise';
    context.fill();
    context.closePath();
    this.x += this.moveX;
    this.y += this.moveY;
  }

  // refactor to create move method

  bounceWalls() {
    if (this.x + 4 === canvas.width) {
      this.moveX = -this.moveX;
    } else if (this.x - 4 === 0) {
      this.moveX = -this.moveX;
    } else if (this.y - 4 === 0) {
      this.moveY = -this.moveY;
    }
  }

  bouncePaddle(paddle) {
    let paddleRight = paddle.x + 50;
    let paddleLeft = paddle.x;
    if (this.y === paddle.y - 6 && this.x > paddleLeft && this.x < paddleRight) {
      this.moveY = -this.moveY;
    }
  }

}

module.exports = Ball;
