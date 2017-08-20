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
      this.x += 10;
      console.log(this.x);
    }
  }

  moveLeft() {
    if (this.x > 1) {
      this.x -= 10;
      console.log(this.x);
    }
  }

  cursorHandler(e) {
    var cursorX = e.clientX - canvas.offsetLeft;
    this.x = cursorX - 25;

    if (cursorX <= 25) {
    this.x = 0;
    } else if (cursorX > canvas.width - 25){
      this.x = canvas.width - 50;
    }
  }

}

module.exports = Paddle;
