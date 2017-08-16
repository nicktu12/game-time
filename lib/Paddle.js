class Paddle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 10;
  }

  draw(context) {
    context.fillStyle = 'red';
    context.fillRect(canvas.width / 2 - 25, canvas.height - this.height * 2.25, this.width, this.height);
  }

  moveRight() {
    this.x += 7;
  }

  moveLeft() {
    this.x -= 7;
  }
}

module.exports = Paddle;
