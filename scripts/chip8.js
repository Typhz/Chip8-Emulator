import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';

const renderer = new Renderer(20);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);
const romName = document.getElementById('rom_file');

let loop;

let fps = 60, fpsInterval, startTime, now, then, elapsed;

function init(romName) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;

  cpu.loadSpritesIntoMemory();
  cpu.loadProgramIntoMemory(romName);
  loop = requestAnimationFrame(step);
}

function step() {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    cpu.cycle();
  }

  loop = requestAnimationFrame(step);
}

function reset() {
  cpu.reset();
  renderer.clear();
  // keyboard.clear();
  // speaker.clear();
  cancelAnimationFrame(loop);
}

romName.addEventListener('change', (event) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const rom = new Uint8Array(event.target.result);
    reset();
    init(rom);
  };
  reader.readAsArrayBuffer(event.target.files[0]);
});

function loadRom(romName) {
  var request = new XMLHttpRequest();
  var self = this;

  request.onload = function () {
    if (request.response) {
      let program = new Uint8Array(request.response);

      init(program)
      console.log(program)
    }
  }

  request.open('GET', 'roms/' + romName);
  request.responseType = "arraybuffer";

  request.send();
}

console.log(cpu.pc)

loadRom('Chip8Picture.ch8');
