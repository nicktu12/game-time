class Paddle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 12;
  }

  draw(context) {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveRight() {
    if (this.x + 50 < 499) {
      this.x += 7;
    }
  }

  moveLeft() {
    if (this.x > 1) {
      this.x -= 7;
    }
  }
  
}

module.exports = Paddle;
