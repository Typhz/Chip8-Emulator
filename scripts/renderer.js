class Renderer {
  constructor(scale) {
    this.cols = 64;
    this.rows = 32;

    this.scale = scale;
    this.canvas = document.querySelector("canvas#emulator_screen");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.cols * this.scale;
    this.canvas.height = this.rows * this.scale;

    this.display = new Array(this.cols * this.rows);
  }

  setPixel(x, y) {
    if (x > this.cols) {
      x -= this.cols;
    } else if (x < 0) {
      x += this.cols;
    }

    if (y > this.rows) {
      y -= this.rows;
    } else if (y < 0) {
      y += this.rows;
    }
  }
}

export default Renderer;
