const GamePiece = require('./GamePiece');

class Powerup extends GamePiece {

  constructor(x, y) {
    super(x, y);
    this.moveY = 1.3;
    this.width = 40;
    this.height = 10;
  }

  draw(context) {
    context.fillStyle = '#00FFFF';
    context.fillRect(this.x, this.y, this.width, this.height);
    this.y += this.moveY;
    context.font="10px Ubuntu";
    context.textAlign="center";
    context.textBaseline = "middle";
    context.fillStyle = "#FF6600";
    context.fillText("P", this.x, this.y);
  }

  hitsPaddle(paddle, ball, array, game, block) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].y + array[i].height >= paddle.y
          && array[i].x <= paddle.x + paddle.width
          && array[i].x + array[i].width >= paddle.x
          && array[i].y <= paddle.y + 12 ) {
        array[i].y = -10;
        array[i].moveY = 0;
        game.points += 25;
        block.updatePointsInfoBar(game);
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

    if (rollDice <= .25) {
      if (paddle.width === 50) {
        console.log('short');
        return paddle.shortPaddle();
      } else {
        return paddle.resetPaddle();
      }
    } else if (rollDice > .25 && rollDice <= .5) {
      if (paddle.width === 50) {
        console.log('long');
        return paddle.longPaddle();
      } else {
        return paddle.resetPaddle();
      }
    } else if (rollDice > .5 && rollDice <= .75) {
      if (ball.moveY >= 1 || ball.moveY <= -1) {
        if (ball.moveX >= 1 || ball.moveX <= -1) {
          console.log('slow');
          return ball.slowBall();
        } else {
          return ball.fastBall();
        }
      } else {
        return ball.fastBall();
      }
    } else {
      if (ball.moveY <= 6 || ball.moveY >= -6) {
        if (ball.moveX <= 6 || ball.moveX >= -6) {
          console.log('fast');
          return ball.fastBall();
        } else {
          return ball.slowBall();
        }
      } else {
        return ball.slowBall();
      }
    }
  }

  // current powerups:
  // ball.slowBall();
  // ball.fastBall();
  // paddle.longPaddle();


}

module.exports = Powerup;
