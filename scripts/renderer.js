class Renderer {
  constructor(scale) {
    this.cols = 64;
    this.rows = 32;

    this.scale = scale;
    this.canvas = document.querySelector("canvas#emulator_screen");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.cols * this.scale;
    this.canvas.height = this.rows * this.scale;

    console.log(this.canvas.width, this.canvas.height);

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
    let pixelLoc = x + y * this.cols;
    this.display[pixelLoc] ^= 1;

    return !this.display[pixelLoc];
  }

  clear() {
    this.display = new Array(this.cols * this.rows);
  }

  render() {
    // Limpa o canvas para cada ciclo de renderização
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Percorre o array de exibição
    for (let i = 0; i < this.cols * this.rows; i++) {
      // Captura a posição x do pixel baseado em `i`
      let x = (i % this.cols) * this.scale;

      // Captura a posição y do pixel baseado em `i`
      let y = Math.floor(i / this.cols) * this.scale;

      // Se o valor de this.display[i] == 1, desenha um pixel
      if (this.display[i]) {
        // Cor do pixel
        this.ctx.fillStyle = "#fff";

        // Coloca um pixel na posição x, y com tamanho scale x scale
        this.ctx.fillRect(x, y, this.scale, this.scale);
      }
    }
  }

  testRender() {
    this.setPixel(0, 0);
    this.setPixel(5, 2);
  }
}

export default Renderer;
