const GamePiece = require('./GamePiece');

class Bullet extends GamePiece {

  constructor(x, y) {
    super(x, y);
    this.width = 5;
    this.height = 5;
    this.moveY = -2;
    this.radius = 5;
  }

  draw(context) {
    context.fillStyle = '#33CCFF';
    context.fillRect(this.x, this.y, this.width, this.height);
    this.y += this.moveY;
  }

  shootBullets(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].draw(context);
    }
  }

}

module.exports = Bullet;
