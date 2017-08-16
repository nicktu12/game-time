class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 50;
    this.width = 8;
    this.height = 8;
    this.moveX = 2;
    this.moveY = -2;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 8, 0, Math.PI*2);
    context.fillStyle = 'turquoise';
    context.fill();
    context.closePath();
    this.x += this.moveX;
    this.y += this.moveY;
  }

  move() {

  }

}

//setInterval(draw, 10);



module.exports = Ball;
