const GamePiece = require('./GamePiece');

class Powerup extends GamePiece {

  constructor(x, y) {
    super(x, y);
    this.moveY = 1.3
  }

  draw(context) {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, 5, 5);
    this.y += this.moveY;
  }

  hitsPaddle(paddle, ball) {
    if (this.y + 5 >= paddle.y
        && this.x <= paddle.x + 50
        && this.x + 5 >= paddle.x) {
      this.y = -10;
      this.moveY = 0;
      ball.fastBall();
    }
  }

  // current powerups:
  // ball.slowBall();
  // ball.fastBall();
  // paddle.longPaddle();


}

module.exports = Powerup;
