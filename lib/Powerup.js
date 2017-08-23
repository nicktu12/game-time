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

  hitsPaddle(paddle, ball, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].y + 5 >= paddle.y
          && array[i].x <= paddle.x + 50
          && array[i].x + 5 >= paddle.x
          && array[i].y - 5 <= paddle.y + 12 ) {
        array[i].y = -10;
        array[i].moveY = 0;
        this.chooseRandomPowerup(ball, paddle);
      }
    }
  }

  dropPowerup(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].draw(context);
    }
  }

  chooseRandomPowerup(ball, paddle) {
    let rollDice = Math.random();

    if (rollDice <= .25) {
      console.log('slow');
      return ball.slowBall();
    } else if (rollDice > .25 && rollDice <= .5 ) {
      console.log('fast');
      return ball.fastBall();
    } else if (rollDice > .5 && rollDice <= .75) {
      console.log('long');
      return paddle.longPaddle();
    } else if (rollDice > .75) {
      console.log('short');
      return paddle.shortPaddle();
    }
  }

  // current powerups:
  // ball.slowBall();
  // ball.fastBall();
  // paddle.longPaddle();


}

module.exports = Powerup;
