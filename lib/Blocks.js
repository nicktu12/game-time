class Blocks {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 10;
  }

  draw(context) {
    context.fillStyle = 'pink';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  buildArray() {
    let blockArray = [];
    console.log('build array');
    for (var i = 0; i < 24; i++) {
      console.log('build loop');
      var x = 6.25 + (i % 8) * 50;
      var y = 6.25 + (i % 3) * 10;
      blockArray.push(new Blocks(x, y));
    }
    return blockArray;
  }

  buildBlocks(array, context) {
    for (var i = 0; i < array.length; i++) {
      array[i].draw(context);
    }
  }

}

module.exports = Blocks;
