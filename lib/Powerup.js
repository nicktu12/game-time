const GamePiece = require('./GamePiece');

class Powerup extends GamePiece {

  constructor(x, y) {
    super(x, y);
    this.moveY = 1.3;
    this.width = 30;
    this.height = 12;
    this.radius = 8;
    this.currentPowerup = '';
    this.currentPowerupAlpha = 1;
  }

  draw(context) {
    this.y += this.moveY;
    context.fillStyle = '#00ffff';
    context.strokeStyle = '#00ffff'
    context.lineJoin = 'round';
    context.lineWidth = 5;
    context.strokeRect(this.x + (this.radius / 2), this.y + (this.radius / 2), this.width - this.radius, this.height - this.radius);
    context.fillRect(this.x + (this.radius / 2), this.y + (this.radius / 2), this.width - this.radius, this.height - this.radius);
    context.font = '10px Ubuntu';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#ff6600';
    context.fillText('P', this.x + 15, this.y + 6);
  }

  hitsPaddle(paddle, ball, array, game, block) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].y + array[i].height >= paddle.y
          && array[i].x <= paddle.x + paddle.width
          && array[i].x + array[i].width >= paddle.x
          && array[i].y <= paddle.y + 12 ) {
        array[i].y = -20;
        array[i].moveY = 0;
        game.points += 25;
        block.updatePointsInfoBar(game);
        this.chooseRandomPowerup(ball, paddle, game);
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

  chooseRandomPowerup(ball, paddle, game) {
    let rollDice = Math.random();

    if (rollDice <= .2) {
      if (paddle.width === 50) {
        this.currentPowerupAlpha = 1;
        this.currentTextSize = 1;
        this.currentPowerup = 'Short Paddle';
        return paddle.shortPaddle();
      } else {
        this.currentPowerupAlpha = 1;
        this.currentTextSize = 1;
        this.currentPowerup = 'Long Paddle';
        return paddle.resetPaddle();
      }
    } else if (rollDice > .2 && rollDice <= .4) {
      if (paddle.width === 50) {
        this.currentPowerupAlpha = 1;
        this.currentTextSize = 1;

        this.currentPowerup = 'Long Paddle';
        return paddle.longPaddle();
      } else {
        this.currentPowerupAlpha = 1;
        this.currentPowerup = 'Short Paddle';
        return paddle.resetPaddle();
      }
    } else if (rollDice > .4 && rollDice <= .6) {
      this.currentPowerupAlpha = 1;
      this.currentTextSize = 1;
      this.currentPowerup = 'Fast Ball';
      return ball.fastBall();
    } else if (rollDice > .6 && rollDice <= .8) {
      this.currentPowerupAlpha = 1;
      this.currentTextSize = 1;
      this.currentPowerup = 'Extra life';
      return game.extraLife();
    } else {
      this.currentPowerupAlpha = 1;
      this.currentTextSize = 1;
      this.currentPowerup = 'Shoot missles';
      paddle.activateShoot();
    }
  }

  drawPowerupText(context) {
    let decrementer = .01;
    if (this.currentTextSize >= 150) {
      this.currentTextSize = 0;
      this.currentPowerupAlpha = 0;
    }
    this.currentTextSize += decrementer * 100;
    context.font = `${this.currentTextSize}px Ubuntu`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    this.currentPowerupAlpha -= decrementer;
    context.fillStyle = `rgba(204, 255 , 0, ${this.currentPowerupAlpha})`;
    context.fillText(this.currentPowerup, 250, 375);
  }

}

module.exports = Powerup;
