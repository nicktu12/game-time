const GamePiece = require('./GamePiece');

class Powerup extends GamePiece {

  constructor(x, y) {
    super(x, y);
    this.moveY = 1.3
  }

  draw(context) {
    context.fillStyle = '#00FFFF';
    context.fillRect(this.x, this.y, 40, 10);
    this.y += this.moveY;
    context.font="10px Ubuntu";
    context.textAlign="center";
    context.textBaseline = "middle";
    context.fillStyle = "#FF6600";
    context.fillText("P", this.x, this.y);
  }

  hitsPaddle(paddle, ball, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].y + 5 >= paddle.y
          && array[i].x <= paddle.x + paddle.width
          && array[i].x + 5 >= paddle.x
          && array[i].y - 5 <= paddle.y + 12 ) {
        array[i].y = -10;
        array[i].moveY = 0;
        this.chooseRandomPowerup(ball, paddle);
        document.getElementById('powerup-paddle').volume = .1;
        document.getElementById('powerup-paddle').play();
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

    if (rollDice <= .5) {
      if (paddle.width >= 50) {
        return paddle.shortPaddle();
      } else {
        return paddle.resetPaddle();
      }
    } else if (rollDice > .5) {
      if (paddle.width <= 50) {
        return paddle.longPaddle();
      } else {
        return paddle.resetPaddle();
      }
    }
  }

  // current powerups:
  // ball.slowBall();
  // ball.fastBall();
  // paddle.longPaddle();


}

module.exports = Powerup;
